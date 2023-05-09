import { authInstance } from '@/services'

export const accountAPI = {
  getCosts: () => {
    return authInstance.get('/subscriptions/costs-subscriptions')
  },
}
