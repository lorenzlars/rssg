import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: 'Ov23liAhzs12Lw6Qeuu0',
      clientSecret: '50ff1e8a671813c1c619a155984c14d418e89ee6'
    })
  ]
})
