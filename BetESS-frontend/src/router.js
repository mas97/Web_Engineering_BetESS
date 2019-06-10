import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import User from '@/components/User'
import Signinup from '@/components/Signinup'
// import Home from '@/components/Home'
// import Bet from '@/components/Bet'
// import Mybets from '@/components/Mybets'
// import Notifications from '@/components/Notifications'
// import Profile from '@/components/Profile'
// import Credits from '@/components/Credits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signinup',
      component: Signinup
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/home',
      name: 'home',
      component: User
    },
    {
      path: '/bet',
      name: 'bet',
      component: User
    },
    {
      path: '/mybets',
      name: 'mybets',
      component: User
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: User
    },
    {
      path: '/credits',
      name: 'credits',
      component: User
    },
    {
      path: '/profile',
      name: 'profile',
      component: User
    }
  ]
})
