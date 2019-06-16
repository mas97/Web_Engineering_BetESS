import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import login from './modules/login'
import register from './modules/register'
import sports from './modules/sports'
import teams from './modules/teams'
import leagues from './modules/leagues'
import credits from './modules/credits'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    login,
    register,
    sports,
    teams,
    leagues,
    credits
  }
})