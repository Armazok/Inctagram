import axios from 'axios'

import { ResMe } from '@/types'

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
})

export const meSendRequest = () => {
  return authInstance.get<ResMe>('auth/me')
}

authInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

    return config
  },
  error => Promise.reject(error)
)

authInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (!originalRequest._isRetry && error?.response?.data?.statusCode === 401) {
      originalRequest._isRetry = true

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-tokens`,
          {},
          { withCredentials: true }
        )

        localStorage.setItem('accessToken', response.data?.accessToken)
        originalRequest.headers['Authorization'] = `Bearer ${response.data?.accessToken}`

        return authInstance(originalRequest)
      } catch (e) {
        console.warn(e)
        // localStorage.removeItem('accessToken')
        // const redirect =
        //   process.env.NODE_ENV === 'development'
        //     ? 'http://localhost:3000/auth/login'
        //     : `https://inctagram-main.vercel.app/auth/login`
        //
        // window.location.assign(redirect)
      }
    }

    return Promise.reject(error)
  }
)
