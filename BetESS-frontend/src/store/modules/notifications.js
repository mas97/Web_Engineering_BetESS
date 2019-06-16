/* eslint-disable no-console */
import notificationsService from '../../services/notificationsService'

const state = {
    notifications: []
  }
  
  const getters = {
    notifications: state => {
      return state.notifications
    }
  }
  
  const mutations = {
    setNotifications (state, response) {
        state.notifications = response
    }
  }

const actions = {
    getNotifications ({ commit }) {
        return new Promise((resolve, reject) => {
            notificationsService.getNotifications()
                .then(function (response) {
                    commit('setNotifications', response)
                })
                .then(() => {
                    resolve(state.notifications)
                }, error => {
                    reject(error)
                })
        })
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}