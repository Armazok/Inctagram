import { FormDataVerification } from '@/modules/auth-modules/registraion-module'
import { authInstance } from '@/services/api/instanse'

export const sendVerificationLink = ({ email }: FormDataVerification) => {
  return authInstance.post('auth/registration-email-resending', { email })
}
