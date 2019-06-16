/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postSport (payload) {
    console.log('teste token ' + store.state.accesstoken)
    return betess.post(`sports/`, {
        name: payload.name,
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getSports () {
      return betess.get(`sports/`).then(response => response.data)
  },
  removeSport (payload) {
      return betess.delete(`sports`, {
          sport_id: payload.sport_id
      }).then(response => response.data)
  }
}