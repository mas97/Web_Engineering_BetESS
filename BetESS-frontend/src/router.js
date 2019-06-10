import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import User from '@/components/User'
import Signinup from '@/components/Signinup'
import Home from '@/components/Home'
import Bet from '@/components/Bet'
import Mybets from '@/components/Mybets'
import Notifications from '@/components/Notifications'
import Profile from '@/components/Profile'
import Credits from '@/components/Credits'
import NavBaroffCanvas from '@/components/NavBaroffCanvas'

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
      component: Home
    },
    {
      path: '/bet',
      name: 'bet',
      component: Bet
    },
    {
      path: '/mybets',
      name: 'mybets',
      component: Mybets
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/navbaroffcanvas',
      name: 'navbaroffcanvas',
      component: NavBaroffCanvas
    }
  ]
})
