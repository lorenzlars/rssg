import { router } from '../trpc'
import { feeds } from './feeds'

export const appRouter = router({
  feeds
})

export type AppRouter = typeof appRouter
