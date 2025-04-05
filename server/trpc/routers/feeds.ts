import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { rssFeedSchema } from '../schemas'

export const feeds = router({
  add: protectedProcedure
    .input(rssFeedSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.create({
        data: {
          ...input,
          ownerId: user.id
        }
      })
    }),
  update: protectedProcedure
    .input(rssFeedSchema.extend({
      id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.update({
        where: {
          id,
          owner: user
        },
        data: {
          ...rest,
          ownerId: user.id
        }
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.delete({
        where: {
          id: input.id,
          owner: user
        }
      })
    }),
  get: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.findFirst({
        where: {
          id: input.id,
          owner: user
        }
      })
    }),
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.findMany({
        where: {
          owner: user
        },
        select: {
          id: true,
          description: true,
          interval: true
        }
      })
    }),
  test: protectedProcedure
    .input(rssFeedSchema)
    .query(async ({ ctx, input }) => {
      if (input.manual) {
        const posts = await parseHtmlByCode(input.url, input.code)

        return feedToRss(ctx.event, input, posts)
      }

      const posts = await parseHtmlByAi(ctx.event, input.url)

      return feedToRss(ctx.event, input, posts)
    })
})
