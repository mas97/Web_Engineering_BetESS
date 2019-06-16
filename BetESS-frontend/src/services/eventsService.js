/* eslint-disable no-console */
import betess from '@/services/betess'
import store from '@/store/modules/login'

export default {
  postEvent (payload) {
    console.log('teste token ' + store.state.accesstoken)
    return betess.post(`events/`, {
        status: payload.name,
        result: payload.result,
        oddHome: payload.oddHome,
        oddAway: payload.oddAway,
        oddDraw: payload.oddDraw,
        premium: payload.premium,
        sport_id: payload.sport_id,
        league_id: payload.league_id,
        team_home_id: payload.team_home_id,
        team_away_id: payload.team_away_id,
        authorization: store.state.accesstoken
    }).then(response => {
        console.log('antes do return ' + response)
        return response.data})
      .catch((error) => {
        alert(error.message)
      })
  },
  getEvents () {
      return betess.get(`events/`).then(response => response.data)
  },

  /*
  removeEvent (payload) {
      return betess.delete(`events`, {
          payload,
          headers: {
            Authorization: store.state.accesstoken
          }
      }).then(response => response.data)
  },
  */

  /* ALTERAR ISTO TD */
  closeEvent (payload) {
    return betess.post(`close_event/`, {
        result: payload.result,
        event_id: payload.event_id,
        authorization: store.state.accesstoken
    }).then(response => response.data)
}
}