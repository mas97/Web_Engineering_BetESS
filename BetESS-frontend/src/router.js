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

/*  
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if ($store.dispatch('login/getToken') == null) {
          next({
              path: '/signinup',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse($store.dispatch('login/getUser'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'user'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if($store.dispatch('login/getToken') == null){
          next()
      }
      else{
          next({ name: 'user'})
      }
  }else {
      next() 
  }
})
*/

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signinup',
      component: Signinup,
      // meta: { guest: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      // meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      // meta: { requiresAuth: true }
    },
    {
      path: '/bet',
      name: 'bet',
      component: Bet,
      //meta: { requiresAuth: true }
    },
    {
      path: '/mybets',
      name: 'mybets',
      component: Mybets,
      //meta: { requiresAuth: true }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      //meta: { requiresAuth: true }
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits,
      //meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      //meta: { requiresAuth: true }
    },
    {
      path: '/sports',
      name: 'sports',
      component: Sports,
      //meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues,
      //meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams,
      //meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/bets',
      name: 'bets',
      component: Bets,
      //meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      //meta: { requiresAuth: true, isAdmin: true }
    }
  ]
})
