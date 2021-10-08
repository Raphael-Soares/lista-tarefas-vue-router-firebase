import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../plugins/firebase'

import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default'),
    meta: {
      requiresAuth: true
    },
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/profile',
        name: 'Profile',
        component:Profile
      }
    ],
  },

  {
    path: '/',
    component: () => import('@/layouts/blank'),
    children:[
      {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from , next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  }
  else { 
    next()
  }
}) 

export default router
