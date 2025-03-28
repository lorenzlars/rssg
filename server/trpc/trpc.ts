import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from '~/server/trpc/context'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(
  function isAuthed ({ ctx, next }) {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
      ctx: {
        session: ctx.session,
        user: ctx.session.user
      }
    })
  }
)
