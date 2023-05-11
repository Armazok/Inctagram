import React, { useState } from 'react'

import {
  accountAPI,
  CostType,
  SubscriptionPeriodType,
} from '@/modules/profile-modules/account-managment/api/account-api'
import { useGetCosts } from '@/modules/profile-modules/account-managment/hooks/useGetCosts'
import { useSubscription } from '@/modules/profile-modules/account-managment/store/subscriptionStore'
import { useGetMyPayments } from '@/modules/profile-modules/my-payments/components/MyPayments'
import login from '@/pages/auth/login'
import { Radio } from '@/ui/radio/Radio'

export const SubscriptionType = () => {
  const { setNewSubscription } = useSubscription()
  const costs = [
    { amount: 10, typeDescription: 'MONTHLY' },
    { amount: 60, typeDescription: 'SEMI_ANNUALLY' },
    { amount: 100, typeDescription: 'YEARLY' },
  ]

  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('')

  const onSubscriptionTypeChange = (option: any) => {
    setSubscriptionTypeValue(option)
    let amount = Number(option.split(' ')[0])
    let typeDescription = option.split(' ')[1].toUpperCase()

    setNewSubscription(typeDescription, amount)
  }

  return (
    <div>
      <h3>Your subscription costs:</h3>
      <div className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px]'}>
        {costs
          ? costs.map(({ amount, typeDescription }: any): any => {
              return (
                <Radio
                  key={amount}
                  callBack={onSubscriptionTypeChange}
                  name="subscriptionType"
                  value={`${amount} ${typeDescription.toLowerCase()}`}
                  checked={`${amount} ${typeDescription.toLowerCase()}` === subscriptionTypeValue}
                  id={typeDescription}
                />
              )
            })
          : ''}
      </div>
    </div>
  )
}
