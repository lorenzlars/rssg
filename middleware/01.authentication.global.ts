export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  if (to.name !== 'login' && status.value === 'unauthenticated') {
    return navigateTo({ name: 'login' })
  }

  if (to.name === 'login' && status.value === 'authenticated') {
    return navigateTo({ name: 'index' })
  }
})
