/* eslint-disable no-console */
import betsService from '../../services/betsService'

const state = {
    bets: []
  }
  
  const getters = {
    bets: state => {
      return state.bets
    }
  }
  
  const mutations = {
    setBets (state, response) {
        state.bets = response
    }
  }

const actions = {
    postBet ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            betsService.postBet(payload)
                .then(function (response) {
                    commit('setBets', response)
                })
                .then(() => {
                    resolve(state.bets)
                }, error => {
                    reject(error)
                })
        })
    },
    getBets ({ commit }) {
        return new Promise((resolve, reject) => {
            betsService.getSports()
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