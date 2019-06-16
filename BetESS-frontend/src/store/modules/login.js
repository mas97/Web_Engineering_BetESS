/* eslint-disable no-console */
import loginService from '../../services/loginService'
import creditsService from '../../services/creditsService';
import profileService from '../../services/profileService';

const state = {
  accesstoken: '',
  premium: false,
  user: '',
}

const getters = {
  accesstoken: state => {
    return state.accesstoken
  },
  user: state => {
      return state.user
  },
  premium: state => {
      return state.premium
  }
}

const mutations = {
  setToken (state, response) {
    state.accesstoken = response.token
    state.premium = response.premium
    console.log('teste mutations ' + response)
    console.log('teste mutations ' + response.token)
  },
  resetToken (state) {
      state.accesstoken = ''
      state.premium = false
      state.username = ''
  },
  setUser (state, response) {
      state.user = response
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
  },
  getUser ( {commit} ) {
      return new Promise((resolve, reject) => {
          loginService.getUser()
            .then(function (response) {
                console.log(response)
                commit('setUser', response[0])
            })
            .then(() => {
                resolve(state.user)
            }, error => {
                reject(error)
            })
      })
  },
  draw ( {commit}, payload ) {
      return new Promise((resolve, reject) => {
          creditsService.draw(payload)
            .then(function (response) {
                console.log(response)
                commit('setUser', response)
            })
            .then(() => {
                resolve(state.user)
            }, error => {
                reject(error)
            })
      })
  },
  deposit ( {commit}, payload ) {
    return new Promise((resolve, reject) => {
        creditsService.deposit(payload)
          .then(function (response) {
              console.log(response)
              commit('setUser', response)
          })
          .then(() => {
              resolve(state.user)
          }, error => {
              reject(error)
          })
    })
   },

   upd_pwd ( {commit}, payload ) {
    return new Promise((resolve, reject) => {
        profileService.upd_pwd(payload)
          .then(function (response) {
              console.log(response)
              commit('setUser', response)
          })
          .then(() => {
              resolve(state.user)
          }, error => {
              reject(error)
          })
    })
   },
   upd_phone ( {commit}, payload ) {
    return new Promise((resolve, reject) => {
        profileService.upd_phone(payload)
          .then(function (response) {
              console.log(response)
              commit('setUser', response)
          })
          .then(() => {
              resolve(state.user)
          }, error => {
              reject(error)
          })
    })
   },
   /* aqui também é necessário payload? */
   upd_premium ( {commit}, payload ) {
    return new Promise((resolve, reject) => {
        profileService.upd_premium(payload)
          .then(function (response) {
              console.log(response)
              commit('setUser', response)
          })
          .then(() => {
              resolve(state.user)
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
