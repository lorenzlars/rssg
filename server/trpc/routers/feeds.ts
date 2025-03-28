import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { feedSchema } from '../schemas'

export const feeds = router({
  add: publicProcedure
    .input(feedSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feed.create({
        data: {
          ...input
        }
      })
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feed.delete({
        where: {
          id: input.id
        }
      })
    }),
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.feed.findMany({
        select: {
          id: true,
          description: true
        }
      })
    })
})
