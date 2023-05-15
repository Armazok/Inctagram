import { authInstance } from '@/services'

export const getMyPayments = () => {
  return authInstance
    .get<{ data: myPaymentsType[] }>('subscriptions/my-payments')
    .then(res => res.data)
}

export type myPaymentsType = {
  userId: number
  customerId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: string
  paymentType: string
}
