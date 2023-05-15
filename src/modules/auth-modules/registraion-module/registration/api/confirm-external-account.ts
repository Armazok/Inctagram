import { authInstance } from '@/services'

export const confirmExternalAccount = (code: string) => {
  return authInstance.post('auth/confirm-external-account', { confirmationCode: code })
}
