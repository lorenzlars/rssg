export default defineTask({
  meta: {
    name: 'test',
    description: 'fetch feed data'
  },
  run: async () => {
    const prisma = getPrismaInstance()
    const feeds = await prisma.feed.findMany()

    for (const feed of feeds) {
      try {
        const html = await $fetch(feed.url)

        // eslint-disable-next-line no-new-func
        const executeCode = new Function('html', feed.code)

        const parsedData = executeCode(html)

        for (const post of parsedData) {
          await prisma.post.create({
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

    return { result: 'Success' }
  }
})
