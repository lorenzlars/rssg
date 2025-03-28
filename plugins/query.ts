import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin({
  hooks: {
    'app:created' (app) {
      app.use(VueQueryPlugin, {
        enableDevtoolsV6Plugin: true
      })
    }
  }
})
