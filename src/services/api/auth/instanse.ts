import axios from 'axios'

export const authInstance = axios.create({
  baseURL: 'https://inctagram-gauv.onrender.com/',
  withCredentials: true,
})
