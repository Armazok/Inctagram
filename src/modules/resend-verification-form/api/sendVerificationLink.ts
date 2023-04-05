import { authInstance } from '@/services/api/auth/instanse'
import { FormData } from '@/modules/resend-verification-form/constants/verificationSchema'

export const sendVerificationLink = ({ email }: FormData) => {
  return authInstance.post('auth/registration-email-resending', { email })
}
