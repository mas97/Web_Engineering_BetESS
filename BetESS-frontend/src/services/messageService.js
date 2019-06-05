import betess from '@/services/betess'

export default {
  fetchMessages() {
    return betess.get(`messages/`)
              .then(response => response.data)
  },
  postMessage(payload) {
    return betess.post(`messages/`, payload)
              .then(response => response.data)
  },
  deleteMessage(msgId) {
    return betess.delete(`messages/${msgId}`)
              .then(response => response.data)
  }
}
