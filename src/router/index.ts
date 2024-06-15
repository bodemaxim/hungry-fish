import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HungryFish',
      component: () => import('../views/GameWindow.vue')
    }
  ]
})

export default router
