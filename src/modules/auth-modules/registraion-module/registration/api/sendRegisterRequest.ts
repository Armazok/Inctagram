import { authInstance } from '@/services/api/auth/instanse'
import { FormData } from '@/modules/auth-modules/registraion-module/registration/constants/registerValidateSchema'

export const sendRegisterRequest = ({ email, password }: Omit<FormData, 'confirmPassword'>) => {
  return authInstance.post('auth/registration', { email, password })
}
