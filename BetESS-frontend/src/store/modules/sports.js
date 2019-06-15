/* eslint-disable no-console */
import sportsService from '../../services/sportsService'

const state = {
    sports: []
  }
  
  const getters = {
    accesstoken: state => {
      return state.sports
    }
  }
  
  const mutations = {
    setSports (state, response) {
      state.sports = response
      console.log(response)
    }
  }

const actions = {
    postSport ({ commit }, payload) {
      sportsService.postSport(payload)
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
    }
  }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}