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
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.feed.findMany()
    })
})
