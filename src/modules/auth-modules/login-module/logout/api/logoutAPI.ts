import { authInstance } from '@/services'

export const sendLogoutRequest = () => {
  return authInstance.post('auth/logout')
}
