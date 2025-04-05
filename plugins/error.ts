export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error) => {
    console.error(error)

    const notification = useNotification()

    notification.error({
      title: 'Vue Error',
      content: error?.message || 'An error occurred'
    })
  }

  nuxtApp.hook('vue:error', (error) => {
    console.error(error)

    const notification = useNotification()

    notification.error({
      title: 'Vue Error',
      content: error?.message || 'An error occurred'
    })
  })
})
