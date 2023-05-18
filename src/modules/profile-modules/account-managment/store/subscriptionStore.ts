import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  PaymentType,
  SubscriptionPeriodType,
  SubscriptionType,
} from '@/modules/profile-modules/account-managment/api/account-api'

interface PostStore {
  subscription: SubscriptionType
  setPaymentType: (payment: PaymentType) => void
  setNewSubscription: (subscriptionType: SubscriptionPeriodType, price: number) => void
}

export const useSubscription = create<PostStore>()(
  immer(set => ({
    subscription: {
      typeSubscription: 'MONTHLY',
      paymentType: 'STRIPE',
      amount: 0,
    } as SubscriptionType,
    setPaymentType(payment: PaymentType) {
      set((state): any => {
        state.subscription.paymentType = payment
      })
    },
    setNewSubscription(subscriptionType: SubscriptionPeriodType, price: number) {
      set((state): any => {
        state.subscription.typeSubscription = subscriptionType
        state.subscription.amount = price
      })
    },
  }))
)
