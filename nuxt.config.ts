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
    disableServerSideAuth: false,
    originEnvKey: 'NUXT_YOUR_ORIGIN',
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true
    }
  },

  formkit: {
    autoImport: true
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
