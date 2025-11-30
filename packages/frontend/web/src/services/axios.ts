import { getErrorMessage } from '@utils'
import axios from 'axios'
import Cookie from 'js-cookie'
import router from 'next/router'

const api = axios.create({
  baseURL: process.env.baseURL
})

api.interceptors.request.use(config => {
  const token = Cookie.get('certificates.session')
  if (!config.headers.authorization && token)
    config.headers.authorization = `Bearer ${token}`

  return config
})

api.interceptors.response.use(
  config => config,
  error => {
    const data = error.response?.data

    if (data?.message === 'token_decode_unauthorized') {
      Cookie.remove('certificates.session')
      router.push('/')
    }

    return Promise.reject(getErrorMessage(data?.message, data?.errors))
  }
)

export default api
