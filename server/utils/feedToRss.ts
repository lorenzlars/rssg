import { Feed } from 'feed'
import { H3Event } from 'h3'
import { RssFeed } from '~/server/trpc/schemas'

type FeedToRssFeed = RssFeed & {id: string}

export default function (event: H3Event, feed: FeedToRssFeed, posts: any[]) {
  const { originUrl } = useRuntimeConfig(event)

  const rss = new Feed({
    title: feed.description,
    id: originUrl,
    link: originUrl,
    feedLinks: {
      rss: `${originUrl}/api/rss/${feed.id}`
    }
  })

  posts.forEach((post) => {
    rss.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content,
      date: post.date
    })
  })

  return rss.rss2()
}
