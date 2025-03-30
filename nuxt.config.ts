import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-27',

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  ssr: false,

  runtimeConfig: {
    cronSecret: process.env.CRON_SECRET,
    authOrigin: process.env.AUTH_ORIGIN ?? `https://${process.env.VERCEL_URL}`,
    authSecret: process.env.AUTH_SECRET,
    authGitHubClientId: process.env.AUTH_GITHUB_CLIENT_ID,
    authGitHubClientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
  },

  nitro: {
    logLevel: process.env.NODE_ENV === 'development' ? 5 : 0,
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN
      }
    }
  },

  modules: [
    '@formkit/nuxt',
    'nuxt-svgo',
    '@sidebase/nuxt-auth',
    '@nuxt/test-utils',
    'nuxtjs-naive-ui'
  ],

  build: {
    transpile: ['trpc-nuxt']
  },

  css: ['~/assets/css/main.css', '@formkit/themes/genesis'],

  typescript: {
    shim: false
  },

  vite: {
    plugins: [
      tailwindcss(),
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  },

  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_ORIGIN ? `${process.env.AUTH_ORIGIN}/api/auth` : `https://${process.env.VERCEL_URL}/api/auth`
  },

  formkit: {
    autoImport: true
  },

  sourcemap: {
    server: true,
    client: process.env.NODE_ENV === 'development'
  },

  imports: {
    presets: [
      {
        from: '@tanstack/vue-query',
        imports: ['useQueryClient', 'useQuery', 'useMutation', 'useIsFetching']
      },
      {
        from: '@formkit/zod',
        imports: ['createZodPlugin']
      }
    ]
  }
})
