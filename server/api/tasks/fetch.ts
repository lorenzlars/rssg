export default defineEventHandler(async (event) => {
  const { cronSecret } = useRuntimeConfig(event)

  if (event.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
    return createError({ status: 401 })
  }

  const feeds = await event.context.prisma.feed.findMany()

  for (const feed of feeds) {
    try {
      const html = await $fetch(feed.url)

      // eslint-disable-next-line no-new-func
      const executeCode = new Function('html', feed.code)

      const parsedData = executeCode(html)

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
