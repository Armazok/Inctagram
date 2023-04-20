import { FormData } from '@/modules/auth-modules/login-module'
import { authInstance } from '@/services'
import { ResLogin } from '@/types'

export const sendLoginRequest = ({ email, password }: Omit<FormData, 'login'>) => {
  return authInstance.post<ResLogin>('auth/login', { email, password })
}
