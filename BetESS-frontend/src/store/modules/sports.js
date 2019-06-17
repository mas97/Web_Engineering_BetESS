/* eslint-disable no-console */
import sportsService from '../../services/sportsService'

const state = {
    sports: []
  }
  
  const getters = {
    sports: state => {
      return state.sports
    }
  }
  
  const mutations = {
    setSports (state, response) {
        state.sports = response
    }
  }

const actions = {
    postSport ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            sportsService.postSport(payload)
                .then(function (response) {
                    console.log(response)
                    commit('setSports', response)
                })
                .then(() => {
                    resolve(state.sports)
                }, error => {
                    reject(error)
                })
        })
    },
    getSports ({ commit }) {
        return new Promise((resolve, reject) => {
            sportsService.getSports()
                .then(function (response) {
                    commit('setSports', response)
                })
                .then(() => {
                    resolve(state.sports)
                }, error => {
                    reject(error)
                })
        })
    },
    removeSport ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            sportsService.removeSport(payload)
                .then(function (response) {
                    commit('setSports', response)
                })
                .then(() => {
                    resolve(state.sports)
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