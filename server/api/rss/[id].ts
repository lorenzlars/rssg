import { Feed } from 'feed'
import { getServerSession } from '#auth'

const basePath = 'https://www.felixseemann.de'

export default defineEventHandler(async (event) => {
  const { context } = event
  const { id } = context.params || {}

  const feedData = await context.prisma.feed.findFirst({
    where: {
      id
    }
  })

  const session = await getServerSession(event)

  console.log(session, feedData)

  const feed = new Feed({
    title: 'Felix Seemann',
    description: 'Software engineering blog.',
    id: basePath,
    link: basePath,
    language: 'en',
    favicon: basePath + '/favicon.ico',
    copyright: 'All rights reserved 2023, Felix Seemann',
    feedLinks: {
      rss: basePath + '/rss.xml'
    },
    author: {
      name: 'Felix Seemann',
      email: 'fseemann@mail.de',
      link: basePath
    }
  })

  return feed.rss2()
})
