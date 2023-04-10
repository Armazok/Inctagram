import { FormDataRegistered } from '@/modules/auth-modules/registraion-module/registration/constants/registerValidateSchema'
import { authInstance } from '@/services/api/auth/instanse'

export const sendRegisterRequest = ({
  email,
  password,
}: Pick<FormDataRegistered, 'email' | 'password'>) => {
  return authInstance.post('auth/registration', { email, password })
}
