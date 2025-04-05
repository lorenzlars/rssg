import type { H3Event } from 'h3'

export default async function (event: H3Event, url: string) {
  const { groqApiKey } = useRuntimeConfig(event)
  const { parseHtml } = useAI(groqApiKey)
  const html: string = await $fetch(url)
  const parsedData = await parseHtml(html)

  // TODO: Validate parsedData against rss feed schema
  return parsedData.map((post: any) => ({ ...post }))
}
