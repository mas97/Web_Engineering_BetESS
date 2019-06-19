/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
    draw (payload) {
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        console.log(payload.command)
        return betess.post(`users/`, {
            authorization: store.state.accesstoken,
            command: 'draw',
            balance: payload.balance
        }).then(response => {
            console.log(response.data)
            return response.data})
        .catch((error) => {
            alert(error.message)
        })
    },
    deposit (payload) {
        return betess.post(`users/`, {
            authorization: store.state.accesstoken,
            command: 'deposit',
            balance: payload.balance
        }).then(response => response.data)
        .catch((error) => {
            alert(error.message)
        })
    }
}