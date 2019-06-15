/* eslint-disable no-console */
import betess from '@/services/betess'

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
  }
}