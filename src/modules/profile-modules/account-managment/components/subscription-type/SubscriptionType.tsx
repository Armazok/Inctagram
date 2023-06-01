import React, { useState, useEffect } from 'react'

import { SubscriptionPeriodType } from '@/modules/profile-modules/account-managment/api/account-api'
import { useGetCosts } from '@/modules/profile-modules/account-managment/hooks/useGetCosts'
import { useSubscription } from '@/modules/profile-modules/account-managment/store/subscriptionStore'
import { Radio } from '@/ui/radio/Radio'

export const SubscriptionType = () => {
  const { setNewSubscription } = useSubscription()

  const { data, isSuccess } = useGetCosts()

  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('')

  const getFinalPriceDescription = (amount: number, typeDescription: SubscriptionPeriodType) => {
    return `${amount}$ ${typeDescription.replace('_', '-').toLowerCase()}`
  }

  const onSubscriptionTypeChange = (
    amount: number,
    typeDescription: SubscriptionPeriodType,
    option: any
  ) => {
    setSubscriptionTypeValue(option)
    setNewSubscription(typeDescription, amount)
  }

  useEffect(() => {
    if (data) {
      let { amount, typeDescription } = data.data.data[0]

      setSubscriptionTypeValue(getFinalPriceDescription(amount, typeDescription))
      setNewSubscription(typeDescription, amount)
    }
  }, [isSuccess])

  return (
    <div>
      <h3 className={'text-blue-50'}>Choose subscription:</h3>
      <div
        className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px] h-[115px]'}
      >
        {isSuccess && data && data.data.data
          ? data.data.data.map(({ amount, typeDescription }: any): any => {
              let value = getFinalPriceDescription(amount, typeDescription)

              return (
                <Radio
                  key={amount}
                  callBack={() => onSubscriptionTypeChange(amount, typeDescription, value)}
                  name="subscriptionType"
                  value={value}
                  checked={value === subscriptionTypeValue}
                  id={typeDescription}
                />
              )
            })
          : ''}
      </div>
    </div>
  )
}
