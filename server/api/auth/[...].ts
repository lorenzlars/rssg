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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
    error: '/auth/signin',
    verifyRequest: '/auth/signin',
    newUser: '/auth/signin'
  },
  callbacks: {
    jwt({ token, account, profile }) {
      console.log(token, account, profile)

      if (account) {
        token.sessionToken = account.session_token
      }

      return token
    },
    async session({ session, token }) {

      console.log(session, token)

      return {
        ...session,
        user: {
          ...session.user,
          id: ''
        }
      }
    }
  },
  adapter: PrismaAdapter(getPrismaInstance())
})
