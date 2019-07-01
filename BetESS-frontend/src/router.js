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
import store from './store/index'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'signinup',
      component: Signinup,
      meta: { guest: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/bet',
      name: 'bet',
      component: Bet,
      meta: { requiresAuth: true }
    },
    {
      path: '/mybets',
      name: 'mybets',
      component: Mybets,
      meta: { requiresAuth: true }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: { requiresAuth: true }
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/sports',
      name: 'sports',
      component: Sports,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/bets',
      name: 'bets',
      component: Bets,
      meta: { requiresAuth: true, isAdmin: true }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { requiresAuth: true, isAdmin: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => {console.log(record.meta); return record.meta.requiresAuth})) {
//     console.log(store.state.login.accesstoken)
//       if ( !store.state.login.accesstoken) {
//           next({
//               name: 'signinup'
//               // params: { nextUrl: to.fullPath }
//           })
//       } else if(to.matched.some(record => record.meta.isAdmin)) {
//           if(store.state.login.isAdmin === true){
//               next()
//           }
//           else{
//               next({ name: 'user'})
//           }
//       }else {
//           next()
//       }
//   } else if(to.matched.some(record => record.meta.guest)) {
//       if( store.state.login.accesstoken){
//         if (!store.state.login.isAdmin){
//           next({ name: 'user'})
//         } else {
//           next({ name: 'admin'})
//         }
//       }
//       else {
//         next()
//       }
//   } else {
//       next() 
//   }
// })

export default router