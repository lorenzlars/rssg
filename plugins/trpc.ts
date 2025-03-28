import { httpBatchLink, createTRPCClient } from '@trpc/client'
import type { AppRouter } from '@/server/trpc/routers'

export default defineNuxtPlugin(() => {
  const trpc = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc'
      })
    ]
  })

  return {
    provide: {
      trpc
    }
  }
})
