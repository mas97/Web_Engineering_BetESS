/* eslint-disable no-console */
import teamsService from '../../services/teamsService'

const state = {
    teams: []
  }
  
  const getters = {
    teams: state => {
      return state.teams
    }
  }
  
  const mutations = {
    setTeams (state, response) {
        state.teams = response
    }
  }

const actions = {
    postTeam ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            teamsService.postTeam(payload)
                .then(function (response) {
                    commit('setTeams', response)
                })
                .then(() => {
                    resolve(state.teams)
                }, error => {
                    reject(error)
                })
        })
      
    },
    getTeams ({ commit }) {
        return new Promise((resolve, reject) => {
            teamsService.getTeams()
                .then(function (response) {
                    commit('setTeams', response)
                })
                .then(() => {
                    resolve(state.teams)
                }, error => {
                    reject(error)
                })
        })
    },
    removeTeam ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            teamsService.removeTeam(payload)
                .then(function (response) {
                    commit('setTeams', response)
                })
                .then(() => {
                    resolve(state.teams)
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