import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = {
  name: 200,
  organization: 200,
  email: 254,
  type: 120,
  message: 5000,
}

function stripHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function clip(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Requête invalide' })
  }

  // Honeypot: bots fill hidden fields; humans never see it.
  if (clip((body as { website?: unknown }).website, 200)) {
    return { ok: true }
  }

  const name = clip((body as { name?: unknown }).name, MAX.name)
  const organization = clip((body as { organization?: unknown }).organization, MAX.organization)
  const email = clip((body as { email?: unknown }).email, MAX.email)
  const type = clip((body as { type?: unknown }).type, MAX.type)
  const message = clip((body as { message?: unknown }).message, MAX.message)

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nom, e-mail et message sont requis',
    })
  }

  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'E-mail invalide' })
  }

  const config = useRuntimeConfig()
  const smtpUser = String(config.smtpUser || '')
  const smtpPass = String(config.smtpPass || '')
  const contactEmail = String(config.contactEmail || smtpUser)

  if (!smtpUser || !smtpPass || !contactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Envoi d’e-mail non configuré',
    })
  }

  const transporter = nodemailer.createTransport({
    host: String(config.smtpHost || 'smtp.office365.com'),
    port: Number(config.smtpPort) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const safeName = stripHeader(name)
  const safeEmail = stripHeader(email)
  const orgLine = organization || '—'
  const typeLine = type || '—'

  const text = [
    `Nouveau message depuis le site Dhivals`,
    '',
    `Nom : ${safeName}`,
    `Organisation : ${orgLine}`,
    `E-mail : ${safeEmail}`,
    `Type d’accompagnement : ${typeLine}`,
    '',
    'Message :',
    message,
  ].join('\n')

  const html = `
    <div style="font-family:Georgia,serif;color:#0f172a;line-height:1.6">
      <p style="margin:0 0 16px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#0f766e">
        Contact site Dhivals
      </p>
      <h1 style="margin:0 0 24px;font-size:22px">Nouveau message</h1>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr>
          <td style="padding:8px 0;color:#64748b;width:180px">Nom</td>
          <td style="padding:8px 0;font-weight:600">${escapeHtml(safeName)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b">Organisation</td>
          <td style="padding:8px 0">${escapeHtml(orgLine)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b">E-mail</td>
          <td style="padding:8px 0">
            <a href="mailto:${escapeHtml(safeEmail)}" style="color:#0f766e">${escapeHtml(safeEmail)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b">Accompagnement</td>
          <td style="padding:8px 0">${escapeHtml(typeLine)}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:12px;white-space:pre-wrap">
        ${escapeHtml(message)}
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Dhivals — site web" <${smtpUser}>`,
      to: contactEmail,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `Contact Dhivals — ${safeName}`,
      text,
      html,
    })
  }
  catch (error) {
    console.error('[contact] SMTP error', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Impossible d’envoyer le message pour le moment',
    })
  }

  return { ok: true }
})
