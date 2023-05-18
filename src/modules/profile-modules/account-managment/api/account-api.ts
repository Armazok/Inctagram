import { authInstance } from '@/services'

export const accountAPI = {
  getCosts: () => {
    return authInstance.get<{ data: CostType[] }>('/subscriptions/cost-of-subscriptions')
  },
  setSubscription: (data: SubscriptionType) => {
    return authInstance.post<{ url: string }>('/subscriptions', data)
  },
  getCurrentSubscription: () => {
    return authInstance.get<CurrentSubscriptionResponseType>('/subscriptions/current-subscriptions')
  },
  setCancelAutoRenewal: () => {
    return authInstance.post('/subscriptions/canceled-auto-renewal')
  },
}

export type CostType = {
  amount: number
  typeDescription: SubscriptionPeriodType
}

export type PaymentType = 'STRIPE' | 'PAYPAL'
export type SubscriptionPeriodType = 'MONTHLY' | 'SEMI_ANNUAL' | 'YEARLY'
export type SubscriptionType = {
  typeSubscription: SubscriptionPeriodType
  paymentType: PaymentType
  amount: number
  // autoRenew: boolean
}

export type CurrentSubscriptionType = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type CurrentSubscriptionResponseType = {
  data: CurrentSubscriptionType[]
  hasAutoRenewal: boolean
}
