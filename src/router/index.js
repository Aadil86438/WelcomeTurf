import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/summary', name: 'summary', component: () => import('../views/Summary.vue') },
    { path: '/settings', name: 'settings', component: () => import('../views/Settings.vue') },
    { path: '*', redirect: '/' }
  ]
})

export default router
