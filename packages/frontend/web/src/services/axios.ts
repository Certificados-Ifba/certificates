import axios from 'axios'
import Cookie from 'js-cookie'

import getErrorMessage from '../utils/getErrorMessage'

const api = axios.create({
  baseURL: process.env.baseURL
})

api.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${Cookie.get('certificates.session')}`

  return config
})

api.interceptors.response.use(
  config => config,
  error => {
    const { data } = error.response

    if (data?.message === 'token_decode_unauthorized') {
      Cookie.remove('certificates.session')
    }
    return Promise.reject(getErrorMessage(data?.message, data?.errors))
  }
)

export default api
