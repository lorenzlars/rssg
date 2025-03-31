export default defineEventHandler(async (event) => {
  const { cronSecret, groqApiKey } = useRuntimeConfig(event)
  const { parseHtml } = useAI(groqApiKey)

  if (event.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
    return createError({ status: 401 })
  }

  const feeds = await event.context.prisma.feed.findMany()

  for (const feed of feeds) {
    try {
      const html = await $fetch(feed.url)

      const parsedData = await parseHtml(html)
      // const parsedData = executeConvertion(feed, html)

      for (const post of parsedData) {
        await event.context.prisma.post.create({
          data: {
            ...post,
            feedId: feed.id
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
})

function executeConvertion (feed: any, html: string) {
  // eslint-disable-next-line no-new-func
  const executeCode = new Function('html', feed.code)

  return executeCode(html)
}
