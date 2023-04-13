import { authInstance } from '@/services/api/auth/instanse'

export const sendLogoutRequest = () => {
  return authInstance.post('auth/logout')
}
