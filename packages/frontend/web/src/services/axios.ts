import axios from 'axios'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

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
    // const router = useRouter()

    const { data } = error.response
    console.log(data)

    if (data?.code === 'token.expired') {
      Cookie.remove('certificates.session')
      // router.replace('/login')
    }
    return Promise.reject(getErrorMessage(data?.message))
  }
)

export default api
