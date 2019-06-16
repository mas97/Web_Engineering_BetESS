/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  getEvents () {
      return betess.get(`notifications/`).then(response => response.data)
  }
}