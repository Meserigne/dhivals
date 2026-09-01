import { createOpenAI } from '@ai-sdk/openai'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { DHIVALS_SYSTEM_PROMPT } from '../utils/dhivals-system-prompt'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey =
    String(config.openaiApiKey || '').trim() ||
    String(process.env.OPENAI_API_KEY || '').trim()

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Chat IA non configuré (clé OpenAI manquante)',
    })
  }

  const openai = createOpenAI({ apiKey })

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
      model: openai('gpt-4o-mini'),
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
