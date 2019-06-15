/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postSport (name) {
    console.log('teste token ' + store.state.token)
    return betess.post(`sports/`, {
        name: name,
        headers: {
            Authorization: store.state.accesstoken
        }
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getSports () {
      return betess.get(`sports/`).then(response => {
          console.log(response)
          return response.data})
  }
}