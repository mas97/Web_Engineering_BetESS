import axios from 'axios'
import Cookies from 'js-cookie'

export default axios.create({
  baseURL: 'http://192.168.33.10:80/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
})
