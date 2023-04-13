import { authInstance } from '@/services/api/auth/instanse'

export const getAccountData = (id: number | undefined) => {
  return authInstance.get(`users/profile/${id}`)
}
