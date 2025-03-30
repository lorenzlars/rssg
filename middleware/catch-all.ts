// middleware/redirect.js
export default defineNuxtRouteMiddleware(() => {
  return navigateTo({ name: 'index' })
})
