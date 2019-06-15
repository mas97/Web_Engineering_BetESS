/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postTeam (payload) {
    console.log('teste token ' + store.state.accesstoken)
    return betess.post(`teams/`, {
        name: payload.name,
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getTeams () {
      return betess.get(`teams/`).then(response => response.data)
  },
  removeTeam (payload) {
      return betess.delete(`teams`, {
          payload,
          headers: {
            Authorization: store.state.accesstoken
          }
      }).then(response => response.data)
  }
}