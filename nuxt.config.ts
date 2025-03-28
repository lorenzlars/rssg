import { setAbsoluteSqliteDatabaseUrlForPrisma } from './prisma/utils'

setAbsoluteSqliteDatabaseUrlForPrisma()

export default defineNuxtConfig({
  compatibilityDate: '2025-03-27',

  ssr: false,

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@huntersofbook/naive-ui-nuxt',
    '@sidebase/nuxt-auth',
    '@formkit/nuxt'
  ],

  build: {
    transpile: ['trpc-nuxt']
  },

  extends: ['@sidebase/core'],

  typescript: {
    shim: false
  },

  auth: {
    isEnabled: true,
    globalAppMiddleware: false,
    disableServerSideAuth: false,
    originEnvKey: 'NUXT_YOUR_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false
    }
  },

  formkit: {
    autoImport: true
  },

  imports: {
    presets: [
      {
        from: '@tanstack/vue-query',
        imports: ['useQueryClient', 'useQuery', 'useMutation']
      },
      {
        from: '@formkit/zod',
        imports: ['createZodPlugin']
      }
    ]
  }
})
