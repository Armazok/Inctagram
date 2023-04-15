import { FormDataRegistered } from '@/modules/auth-modules/registraion-module'
import { authInstance } from '@/services/api/instanse'

export const sendRegisterRequest = ({
  email,
  password,
  userName,
}: Omit<FormDataRegistered, 'confirmPassword'>) => {
  return authInstance.post('auth/registration', { userName, email, password })
}
