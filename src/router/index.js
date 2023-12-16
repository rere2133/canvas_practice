import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/basic',
    name: 'Basic',
    component: () => import('@/views/Basic.vue')
  },
  {
    path: '/coordinate',
    name: 'Coordinate',
    component: () => import('@/views/Coordinate.vue')
  },
  // {
  //   path: '/acceleration',
  //   name: 'Acceleration',
  //   component: () => import('@/views/Acceleration.vue')
  // },
  {
    path: '/acceleration',
    name: 'Acceleration',
    component: () => import('@/views/Acceleration_vector.vue')
  },
  {
    path: '/vector',
    name: 'Vector',
    component: () => import('@/views/Vector.vue')
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import('@/views/Snake.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router