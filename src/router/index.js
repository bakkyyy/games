import Vue from 'vue'
import VueRouter from 'vue-router'
import Tikgame from '../views/Tikgame.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Tikgame',
    component: Tikgame
  },
  {
    path: '/snake',
    name: 'Snake',
    component: () => import( /* webpackChunkName: "snake" */ '../views/Snake.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router