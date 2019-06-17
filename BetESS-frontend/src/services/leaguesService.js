/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postLeague (payload) {
    console.log('teste token ' + store.state.accesstoken)
    return betess.post(`leagues/`, {
        command: 'postLeague',
        name: payload.name,
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getLeagues () {
      return betess.get(`leagues/`).then(response => response.data)
  },
  removeLeague (payload) {
      return betess.post(`leagues/`, {
          league_id: payload.league_id,
          authorization: store.state.accesstoken,
          command: 'removeLeague'
      }).then(response => response.data)
  }
}