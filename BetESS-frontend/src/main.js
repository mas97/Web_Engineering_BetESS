import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store' 
import router from '@/router'

import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/offcanvas.css'
import 'bootstrap/dist/js/bootstrap.bundle'

Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Vuetify)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')