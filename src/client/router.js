import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
