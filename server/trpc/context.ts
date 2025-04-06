import { H3Event } from 'h3'
// import { getServerSession } from '#auth'

export async function createContext (event: H3Event) {
  // TODO: This util function is not working, further investigation is needed
  // const session = await getServerSession(event)
  const session = await $fetch('/api/auth/session', { headers: event.headers })

  return {
    event,
    session,
    prisma: event.context.prisma
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
