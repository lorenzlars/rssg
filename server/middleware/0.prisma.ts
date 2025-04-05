import type { PrismaClient } from '@prisma/client/edge'

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  event.context.prisma = getPrismaInstance()
})
