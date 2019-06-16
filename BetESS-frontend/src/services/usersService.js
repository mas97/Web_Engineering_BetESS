import betess from '@/services/betess'

export default {
//   fetchCaregivers () {
//     return betess.get(`caregivers/`, {
//       headers: {
//         Authorization: 'Token ' + store.state.accesstoken
//       }
//     }).then(response => response.data)
//   },
  registerUser (payload) {
    // console.log('teste de token no request' + store.state.accesstoken)
    // console.log(payload)
    return betess.post(`register/`, payload).then(response => response.data)
  }
//   fetchPatients () {
//     return betess.get(`patients/`, {
//       headers: {
//         Authorization: 'Token ' + store.state.accesstoken
//       }
//     }).then(response => response.data)
//   },
//   registerPatient (payload) {
//     return betess.post(`patients/`, {
//       info: payload
//     }, {
//       headers: {
//         Authorization: 'Token ' + store.state.accesstoken
//       }
//     }).then(response => response.data)
//   },
//   fetchBackoffice () {
//     return betess.get(`backoffice_user/`, {
//       headers: {
//         Authorization: 'Token ' + store.state.accesstoken
//       }
//     }).then(response => response.data)
//   }
}
