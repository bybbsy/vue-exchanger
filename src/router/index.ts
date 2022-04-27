import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/markets',
    name: 'markets',
    component: () => import(/* webpackChunkNmae: "markets" */ '@/views/CryptoCurrenciesPage.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/DetailInfo.vue')
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('@/views/QuizPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue')
  },
  {
    path: '/components',
    name: 'components-page',
    component: () => import('@/views/ComponentsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
