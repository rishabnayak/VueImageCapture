import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import db from '@/firebase/init.js'
import store from '@/store/store.js'
const login = () =>
  import ('@/components/login')
const profile = () =>
  import ('@/components/users/profile')
const app = () =>
    import ('@/components/app/app')
const calibration = () =>
      import ('@/components/app/calibration')
import home from '@/components/static/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: home,
      alias: '/index.html'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/app',
      name: 'app',
      component: app,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calibration',
      name: 'calibration',
      component: calibration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user
    if (user) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

export default router
