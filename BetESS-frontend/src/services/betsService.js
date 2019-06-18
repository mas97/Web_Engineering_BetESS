/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postBet (payload) {
    return betess.post(`bets/`, {
        amount: payload.amount,
        result: payload.result,
        event_id: payload.event_id,
        command: 'postBet',
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getBets (payload) {
      return betess.post(`bets/`, {
        authorization: store.state.accesstoken,
        role: payload.role,
        command: 'getBets'
      }).then(response => response.data)
  },
  cashout (payload) {
      return betess.post(`bets/`, {
        bet_id: payload.bet_id,
        authorization: store.state.accesstoken,
        command: 'cashout'
      }).then(response => response.data)
  }
}