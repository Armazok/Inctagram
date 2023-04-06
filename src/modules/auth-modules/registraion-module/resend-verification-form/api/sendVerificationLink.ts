import { authInstance } from '@/services/api/auth/instanse'
import { FormDataVerification } from '@/modules/auth-modules/registraion-module/resend-verification-form/constants/verificationSchema'

export const sendVerificationLink = ({ email }: FormDataVerification) => {
  return authInstance.post('auth/registration-email-resending', { email })
}
