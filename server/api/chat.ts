import {
  convertToModelMessages,
  createGateway,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { DHIVALS_SYSTEM_PROMPT } from '../utils/dhivals-system-prompt'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey =
    String(config.aiGatewayApiKey || '').trim() ||
    String(process.env.AI_GATEWAY_API_KEY || '').trim()

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Chat IA non configuré (clé AI Gateway manquante)',
    })
  }

  const gateway = createGateway({ apiKey })

  return defineEventHandler(async (event) => {
    const body = await readBody(event).catch(() => null)
    const messages = (body as { messages?: UIMessage[] } | null)?.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Messages manquants',
      })
    }

    // Keep the last turns to control cost/latency
    const recent = messages.slice(-12)

    const result = streamText({
      model: gateway('openai/gpt-5.4'),
      system: DHIVALS_SYSTEM_PROMPT,
      messages: await convertToModelMessages(recent),
      maxOutputTokens: 500,
      temperature: 0.4,
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    })
  })
})
