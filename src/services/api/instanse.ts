import axios from 'axios'

import { ResMe } from '@/types'

export const authInstance = axios.create({
  baseURL: 'https://lionfish-app-3jdhn.ondigitalocean.app/',
  withCredentials: true,
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

// authInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config
//
//     console.log(error, 'error')
//     console.log(originalRequest, 'originalRequest')
//     if (!originalRequest._isRetry && error?.response?.data?.statusCode === 401) {
//       originalRequest._isRetry = true
//
//       console.log(originalRequest, 'originalRequest - 2')
//
//       try {
//         const response = await axios.post(
//           `https://lionfish-app-3jdhn.ondigitalocean.app/auth/update-tokens`,
//           {},
//           { withCredentials: true }
//         )
//
//         console.log(response, 'response')
//
//         localStorage.setItem('accessToken', accessToken in response )
//
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken in response}`
//
//         return authInstance(originalRequest)
//       } catch (e) {
//         console.log(e, 'e')
//         //localStorage.removeItem('accessToken')
//
//       }
//     }
//
//     return Promise.reject(error)
//   }
// )
