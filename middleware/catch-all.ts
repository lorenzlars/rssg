export default defineNuxtRouteMiddleware(() => {
  console.log('test')
  return navigateTo({ name: 'index' })
})
