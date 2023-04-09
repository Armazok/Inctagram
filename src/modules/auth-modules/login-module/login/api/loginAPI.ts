import { FormData } from '../constants/loginValidationSchema'

import { authInstance } from '@/services/api/auth/instanse'

export const sendLoginRequest = ({ email, password }: Omit<FormData, 'login'>) => {
  return authInstance.post('auth/login', { email, password })
}
