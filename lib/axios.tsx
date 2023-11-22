import axios from 'axios'
import { cookies } from 'next/headers'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL

axios.interceptors.request.use((config) => {
  const token = cookies().get('__token')?.value

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default axios
