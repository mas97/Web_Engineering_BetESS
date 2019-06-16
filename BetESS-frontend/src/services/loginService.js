/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  getToken (credencials) {
    // console.log('tentativa de enviar o pedido com ' + credencials.username + credencials.password)
    return betess.post(`token/`, {
      email: credencials.email,
      password: credencials.password
      // username: 'admin',
      // password: 'admin'
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getUser () {
    console.log(store.state.accesstoken)
      return betess.post(`users/`, {
          authorization: store.state.accesstoken,
          command: 'getUser'
      }).then(response => response.data)
        .catch((error) => {
            alert(error.message)
        })
  }
}