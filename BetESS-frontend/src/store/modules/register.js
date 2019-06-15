import usersService from '../../services/usersService'

const actions = {
  registerUser ({ commit }, payload) {
    usersService.registerUser(payload)
  }
}

export default {
  namespaced: true,
  actions
}