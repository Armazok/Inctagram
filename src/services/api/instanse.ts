import axios from 'axios'

export const authInstance = axios.create({
  baseURL: 'https://lionfish-app-3jdhn.ondigitalocean.app/',
  withCredentials: true,
})

authInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return config
})
