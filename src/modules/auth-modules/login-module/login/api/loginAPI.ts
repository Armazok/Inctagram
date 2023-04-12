import { FormData } from '../constants/loginValidationSchema'

import { authInstance } from '@/services/api/auth/instanse'
import { ResLogin } from '@/types'

export const meSendRequest = () => {
  return authInstance.get('auth/me')
}
export const sendLoginRequest = ({ email, password }: Omit<FormData, 'login'>) => {
  return authInstance.post<ResLogin>('auth/login', { email, password })
}
