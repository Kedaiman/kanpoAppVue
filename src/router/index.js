import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roop',
    component: () => import('../views/topView.vue')
  },
  {
    path: '/top',
    name: 'top',
    component: () => import('../views/topView.vue')
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('../views/questionView.vue'),
    props: true
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/resultView.vue'),
    props: true
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
