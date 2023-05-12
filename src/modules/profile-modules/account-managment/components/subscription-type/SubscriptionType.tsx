import React, { useState } from 'react'
import { useGetCosts } from '@/modules/profile-modules/account-managment/hooks/useGetCosts'
import { useSubscription } from '@/modules/profile-modules/account-managment/store/subscriptionStore'
import { Radio } from '@/ui/radio/Radio'

export const SubscriptionType = () => {
  const { setNewSubscription } = useSubscription()

  const { data, isSuccess, isError } = useGetCosts()

  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('')

  const onSubscriptionTypeChange = (option: any) => {
    setSubscriptionTypeValue(option)
    let amount = Number(option.split(' ')[0])
    let typeDescription = option.split(' ')[1].toUpperCase()

    setNewSubscription(typeDescription, amount)
  }

  let costs = []

  return (
    <div>
      <h3>Your subscription costs:</h3>
      <div className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px]'}>
        {isSuccess &&
        //@ts-ignore
        data.data.data
          ? //@ts-ignore
            data.data.data.map(({ amount, typeDescription }: any): any => {
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
