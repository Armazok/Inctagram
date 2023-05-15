import { authInstance } from '@/services'

export const cancelExternalAccount = (code: string) => {
  return authInstance.post('auth/reject-adding-external-account', { confirmationCode: code })
}
