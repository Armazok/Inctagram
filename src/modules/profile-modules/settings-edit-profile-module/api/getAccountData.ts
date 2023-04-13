import { authInstance } from '@/services/api/auth/instanse'

export const getAccountData = (id: string) => {
  return authInstance.get(`users/profile/${id}`)
}
