import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.NUXT_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_AUTH_GITHUB_CLIENT_SECRET
    })
  ]
})
