import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-27',

  ssr: false,

  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET
  },

  nitro: {
    logLevel: process.env.NODE_ENV === 'development' ? 5 : 0,
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN
      }
    },
    experimental: {
      tasks: true
    },
    scheduledTasks: process.env.NODE_ENV === 'development'
      ? {
          '* * * * *': ['test']
        }
      : {
          '0 * * * *': ['test']
        }
  },

  modules: [
    'nuxt-svgo',
    '@sidebase/nuxt-auth',
    '@formkit/nuxt',
    '@nuxt/test-utils',
    'nuxtjs-naive-ui'
  ],

  build: {
    transpile: ['trpc-nuxt']
  },

  css: ['~/assets/css/main.css'],

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
    globalAppMiddleware: true,
    originEnvKey: 'NUXT_YOUR_ORIGIN',
    provider: {
      type: 'authjs',
      defaultProvider: 'github',
      addDefaultCallbackUrl: true
    }
  },

  formkit: {
    autoImport: true
  },

  sourcemap: {
    server: process.env.NODE_ENV === 'development',
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
