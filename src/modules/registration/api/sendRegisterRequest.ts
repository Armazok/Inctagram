import { FormData } from '@/modules/registration/constants/registerValidateSchema'
import { authInstance } from '@/services/api/auth/instanse'

export const sendRegisterRequest = ({ email, password }: Omit<FormData, 'confirmPassword'>) => {
  return authInstance.post('auth/registration', { email, password })
}
