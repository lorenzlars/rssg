import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { feedSchema } from '../schemas'

export const feeds = router({
  add: protectedProcedure
    .input(feedSchema)
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
    .input(feedSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: ctx.user?.email
        }
      })

      return ctx.prisma.feed.update({
        where: {
          id: input.id,
          owner: user
        },
        data: {
          ...input,
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
    })
})
