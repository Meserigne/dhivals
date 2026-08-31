type GraphTokenResponse = {
  access_token?: string
  error?: string
  error_description?: string
}

type SendGraphMailInput = {
  tenantId: string
  clientId: string
  clientSecret: string
  /** Mailbox that sends (must exist in the tenant). */
  fromUser: string
  to: string
  replyToName: string
  replyToEmail: string
  subject: string
  text: string
  html: string
}

async function getAppAccessToken(input: {
  tenantId: string
  clientId: string
  clientSecret: string
}): Promise<string> {
  const url = `https://login.microsoftonline.com/${encodeURIComponent(input.tenantId)}/oauth2/v2.0/token`
  const body = new URLSearchParams({
    client_id: input.clientId,
    client_secret: input.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const data = (await res.json().catch(() => ({}))) as GraphTokenResponse
  if (!res.ok || !data.access_token) {
    throw new Error(
      data.error_description || data.error || `Azure token HTTP ${res.status}`,
    )
  }
  return data.access_token
}

/** Envoie un e-mail via Microsoft Graph (OAuth2 app-only). Contourne SMTP AUTH désactivé. */
export async function sendMailViaGraph(input: SendGraphMailInput): Promise<void> {
  const token = await getAppAccessToken({
    tenantId: input.tenantId,
    clientId: input.clientId,
    clientSecret: input.clientSecret,
  })

  const endpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(input.fromUser)}/sendMail`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        subject: input.subject,
        body: {
          contentType: 'HTML',
          content: input.html,
        },
        toRecipients: [
          {
            emailAddress: { address: input.to },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              name: input.replyToName,
              address: input.replyToEmail,
            },
          },
        ],
      },
      saveToSentItems: true,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    throw new Error(`Graph sendMail HTTP ${res.status}: ${errBody.slice(0, 500)}`)
  }
}
