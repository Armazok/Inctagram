import { authInstance } from '@/services'

export const getAccountData = (id: number | undefined) => {
  return authInstance.get(`users/profile/${id}`)
}
