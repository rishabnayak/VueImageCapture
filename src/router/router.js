import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import db from '@/firebase/init.js'
import store from '@/store/store.js'
const login = () =>
  import ('@/components/login')
const editprofile = () =>
  import ('@/components/users/edit-profile')
const profile = () =>
  import ('@/components/users/profile')
const allusers = () =>
  import ('@/components/users/all-users')
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
      path: '/editprofile',
      name: 'editprofile',
      component: editprofile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'allusers',
      component: allusers
    },
    {
      path: '/profile/:uname',
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
