/* eslint-disable no-console */
import leaguesService from '../../services/leaguesService'

const state = {
    leagues: []
  }
  
  const getters = {
    leagues: state => {
      return state.leagues
    }
  }
  
  const mutations = {
    setLeagues (state, response) {
        state.leagues = response
    }
  }

const actions = {
    postLeague ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            leaguesService.postLeague(payload)
                .then(function (response) {
                    commit('setLeagues', response)
                })
                .then(() => {
                    resolve(state.leagues)
                }, error => {
                    reject(error)
                })
        })
    },
    getLeagues ({ commit }) {
        return new Promise((resolve, reject) => {
            leaguesService.getLeagues()
                .then(function (response) {
                    console.log(response)
                    commit('setLeagues', response)
                })
                .then(() => {
                    resolve(state.leagues)
                }, error => {
                    reject(error)
                })
        })
    },
    removeLeague ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            leaguesService.removeLeague(payload)
                .then(function (response) {
                    commit('setLeagues', response)
                })
                .then(() => {
                    resolve(state.leagues)
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