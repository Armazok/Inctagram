import { FormData } from '@/modules/auth-modules/login-module'
import { authInstance } from '@/services'
import { ResLogin, ResMe } from '@/types'

export const meSendRequest = () => {
  return authInstance.get<ResMe>('auth/me')
}
export const sendLoginRequest = ({ email, password }: Omit<FormData, 'login'>) => {
  return authInstance.post<ResLogin>('auth/login', { email, password })
}
