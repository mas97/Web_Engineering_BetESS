/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
    upd_pwd (payload) {
        return betess.post(`userAuth/`, {
            authorization: store.state.accesstoken,
            password: payload.password
        }).then(response => {
            console.log(response.data)
            return response.data})
        .catch((error) => {
            alert(error.message)
        })
    },
    upd_phone (payload) {
        return betess.post(`users/`, {
            authorization: store.state.accesstoken,
            command: 'upd_phone',
            phoneno: payload.phoneno
        }).then(response => response.data)
        .catch((error) => {
            alert(error.message)
        })
    },
    /* provavelmente tirar "premium: payload.premium"*/
    upd_premium (payload) {
        return betess.post(`users/`, {
            authorization: store.state.accesstoken,
            command: 'upd_premium',
            premium: payload.premium
        }).then(response => response.data)
        .catch((error) => {
            alert(error.message)
        })
    }
}