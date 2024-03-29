import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import login from './modules/login'
import register from './modules/register'
import sports from './modules/sports'
import teams from './modules/teams'
import leagues from './modules/leagues'
import events from './modules/events'
import bets from './modules/bets'
import notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    login,
    register,
    sports,
    teams,
    leagues,
    events,
    bets,
    notifications
  }
})