import { myPaymentsType } from '@/modules/profile-modules/my-payments'
import { authInstance } from '@/services'

export const getMyPayments = () => {
  return authInstance
    .get<{ data: myPaymentsType[] }>('subscriptions/my-payments')
    .then(res => res.data)
}
