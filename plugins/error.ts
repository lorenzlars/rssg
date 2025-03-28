export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error) => {
    const notification = useNotification()

    console.error(error)

    notification.error({
      title: 'Vue Error',
      content: error?.message as string || 'An error occurred'
    })
  })
})
