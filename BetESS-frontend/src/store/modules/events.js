/* eslint-disable no-console */
import eventsService from '../../services/eventsService'

const state = {
    events: []
  }
  
  const getters = {
    events: state => {
      return state.events
    }
  }
  
  const mutations = {
    setEvents (state, response) {
        state.events = response
    }
  }

const actions = {
    postEvent ({ commit }, payload) {
      sportsService.postSport(payload)
    },
    getEvents ({ commit }) {
        return new Promise((resolve, reject) => {
            eventsService.getEvents()
                .then(function (response) {
                    commit('setEvents', response)
                })
                .then(() => {
                    resolve(state.sports)
                }, error => {
                    reject(error)
                })
        })
    },
    /*
    removeEvent ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            eventsService.removeEvent(payload)
                .then(function (response) {
                    commit('setEvents', response)
                })
                .then(() => {
                    resolve(state.events)
                }, error => {
                    reject(error)
                })
        })
    }
    */
   closeEvent ({ commit }, payload) {
    return new Promise((resolve, reject) => {
        eventsService.closeEvent(payload)
            .then(function (response) {
                commit('setEvents', response)
            })
            .then(() => {
                resolve(state.events)
            }, error => {
                reject(error)
            })
    })
  }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}