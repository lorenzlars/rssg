import { initTRPC } from '@trpc/server'
import type { Context } from '~/server/trpc/context'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create()

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure
// export const protectedProcedure = t.procedure.use(
//   async function isAuthed ({ ctx, next }) {
//     if (!ctx.cookie) {
//       throw new TRPCError({ code: 'UNAUTHORIZED' })
//     }

//     return next()
//   }
// )
