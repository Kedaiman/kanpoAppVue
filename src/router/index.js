import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
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
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/errorView.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/errorView.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/searchView.vue'),
    props: true
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
