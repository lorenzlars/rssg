import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NuxtAuthHandler } from '#auth'
import getPrismaInstance from '~/server/utils/getPrismaInstance'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.NUXT_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_AUTH_GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: ({ session }) => {
      return {
        ...session,
        user: session.user
      }
    }
  },
  adapter: PrismaAdapter(getPrismaInstance())
})
