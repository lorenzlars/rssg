import { H3Event } from 'h3'
import { RssFeed } from '~/server/trpc/schemas'

export default defineEventHandler(async (event) => {
  const { cronSecret } = useRuntimeConfig(event)

  if (event.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
    return createError({ status: 401 })
  }

  const feeds = await event.context.prisma.feed.findMany()

  for (const feed of feeds) {
    try {
      const posts = await getPosts(event, feed)

      for (const post of posts) {
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

async function getPosts (event: H3Event, feed: RssFeed) {
  if (feed.manual) {
    return await parseHtmlByCode(feed.url, feed.code!)
  }

  return await parseHtmlByAi(event, feed.url)
}
