import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('../views/startView.vue')
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../views/startView.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/resultView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detailView.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
