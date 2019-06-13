import Vue from 'vue'
import Router from 'vue-router'

import Signinup from '@/components/Signinup'
/* User */
import User from '@/components/User'
import Bet from '@/components/Bet'
import Mybets from '@/components/Mybets'
import Notifications from '@/components/Notifications'
import Credits from '@/components/Credits'
import Profile from '@/components/Profile'
/* Admin */
import Admin from '@/components/Admin'
import Sports from '@/components/Sports'
import Teams from '@/components/Teams'
import Leagues from '@/components/Leagues'
import Bets from '@/components/Bets'
import Events from '@/components/Events'

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
      path: '/sports',
      name: 'sports',
      component: Sports
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/bets',
      name: 'bets',
      component: Bets
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    }
  ]
})
