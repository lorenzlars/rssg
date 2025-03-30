import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const { originUrl } = useRuntimeConfig(event)
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
    return createError({
      status: 404,
      message: `Feed ${id} not found`
    })
  }

  const feed = new Feed({
    title: feedData.description,
    id: originUrl,
    link: originUrl,
    feedLinks: {
      rss: `${originUrl}/api/rss/${id}`
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
