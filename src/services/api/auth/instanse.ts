import axios from 'axios'

export const authInstance = axios.create({
  // eslint-disable-next-line no-constant-condition
  baseURL: 'https://inctagram-gauv.onrender.com/'
    ? 'https://lionfish-app-3jdhn.ondigitalocean.app/'
    : '',
  withCredentials: true,
})

authInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return config
})
