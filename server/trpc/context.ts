import { H3Event } from 'h3'
import { getServerSession } from '#auth'

export async function createContext (event: H3Event) {
  const session = await getServerSession(event)

  return {
    session,
    prisma: event.context.prisma,
    cookie: parseCookies(event)
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
