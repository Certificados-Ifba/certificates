import axios from 'axios'
import { useRouter } from 'next/router'

const api = axios.create({
  baseURL: process.env.baseURL || 'http://localhost:3001'
})

// api.interceptors.request.use(config => {
//   config.headers.authorization = `Bearer ${localStorage.getItem(
//     '@Certificados:token'
//   )}`

//   return config
// })

api.interceptors.response.use(
  config => config,
  error => {
    const router = useRouter()
    const { data } = error.response

    if (data?.code === 'token.expired') {
      // localStorage.clear()

      router.push('/login')
    }
  }
)

export default api
