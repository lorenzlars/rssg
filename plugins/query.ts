import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', (app) => {
    app.use(VueQueryPlugin, {
      enableDevtoolsV6Plugin: true,
      throwOnError: true
    })
  })
})
