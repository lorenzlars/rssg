import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { feedSchema } from '../schemas'

export const feeds = router({
  add: protectedProcedure
    .input(feedSchema)
    .mutation(({ input, ctx }) => {
      console.log(ctx.user)

      return ctx.prisma.feed.create({
        data: {
          ...input,
          ownerId: ctx.user?.email
        }
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.feed.delete({
        where: {
          id: input.id,
          ownerId: ctx.user?.email
        }
      })
    }),
  getAll: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.feed.findMany({
        where: {
          ownerId: ctx.user?.email
        },
        select: {
          id: true,
          description: true,
          interval: true
        }
      })
    })
})
