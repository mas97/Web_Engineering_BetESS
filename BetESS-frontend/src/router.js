import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import User from '@/components/User'
import Signinup from '@/components/Signinup'

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
    }
  ]
})
