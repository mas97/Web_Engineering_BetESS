/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postBet (payload) {
    console.log('teste token ' + store.state.token)
    return betess.post(`bets/`, {
        payload,
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getBets (payload) {
      return betess.get(`bets/`, {
        authorization: store.state.accesstoken
        role: payload.role
      }).then(response => response.data)
  },
  removeSport (payload) {
      return betess.delete(`sports`, {
          payload,
          headers: {
            Authorization: store.state.accesstoken
          }
      }).then(response => response.data)
  }
}