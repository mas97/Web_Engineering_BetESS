import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import login from './modules/login'
import register from './modules/register'
import sports from './modules/sports'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    login,
    register,
    sports
  }
})