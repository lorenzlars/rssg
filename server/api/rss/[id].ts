import { Feed } from 'feed'

const basePath = process.env.NUXT_YOUR_ORIGIN || ''

export default defineEventHandler(async (event) => {
  const { context } = event
  const { id } = context.params || {}

  const feedData = await context.prisma.feed.findFirst({
    where: {
      id
    },
    include: {
      posts: true
    }
  })

  if (!feedData) {
    throw createError({
      statusCode: 404,
      statusMessage: `Feed ${id} not found`
    })
  }

  const feed = new Feed({
    title: feedData.description,
    id: basePath,
    link: basePath,
    feedLinks: {
      rss: `${basePath}/api/rss/${id}`
    }
  })

  feedData.posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content,
      date: post.date
    })
  })

  return feed.rss2()
})
