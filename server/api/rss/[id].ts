import { Feed } from 'feed'

const basePath = process.env.NUXT_YOUR_ORIGIN || ''

export default defineEventHandler(async (event) => {
  const { context } = event
  const { id } = context.params || {}

  const feedData = await context.prisma.feed.findFirst({
    where: {
      id
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

  return feed.rss2()
})
