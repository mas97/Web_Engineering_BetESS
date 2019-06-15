/* eslint-disable no-console */
import loginService from '../../services/loginService'

const state = {
  accesstoken: '',
  premium: false,
  username: ''
}

const getters = {
  accesstoken: state => {
    return state.accesstoken
  }
}

const mutations = {
  setToken (state, response) {
    state.accesstoken = response.token
    state.premium = response.premium
    state.username = response.username
    console.log('teste mutations ' + response)
    console.log('teste mutations ' + response.token)
  },
  resetToken (state) {
      state.accesstoken = ''
  }
}

const actions = {
  getToken ({ commit }, credencials) {
    return new Promise((resolve, reject) => {
      loginService.getToken(credencials)
        .then(function (response) {
            console.log('action '  + response.token)
          commit('setToken', response)
        })
        .then(() => {
            console.log('antes resolve ' + state.accesstoken)
          resolve(state.accesstoken)
        }, error => {
          reject(error)
        })
    })
  },
  resetToken ( {commit} ) {
      return new Promise((resolve, reject) => {
          commit('resetToken').then(() => {
              resolve('Success logout.')
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
