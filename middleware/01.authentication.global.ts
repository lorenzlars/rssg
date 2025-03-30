export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  console.log(status.value)

  if (status.value === 'unauthenticated') {
    return navigateTo({ name: 'login' })
  }

  if (to.name === 'login' && status.value === 'authenticated') {
    return navigateTo({ name: 'index' })
  }
})
