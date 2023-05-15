import React, { useState, useEffect } from 'react'

import { useGetCosts } from '@/modules/profile-modules/account-managment/hooks/useGetCosts'
import { useSubscription } from '@/modules/profile-modules/account-managment/store/subscriptionStore'
import { Radio } from '@/ui/radio/Radio'

export const SubscriptionType = () => {
  const { setNewSubscription } = useSubscription()

  const { data, isSuccess } = useGetCosts()

  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('')

  const onSubscriptionTypeChange = (option: any) => {
    setSubscriptionTypeValue(option)
    //@ts-ignore
    let amount = Number(option.split(' ')[0].slice(0, -1))
    let typeDescription = option.split(' ')[1].toUpperCase()

    setNewSubscription(typeDescription, amount)
  }

  useEffect(() => {
    if (data) {
      let { amount, typeDescription } = data.data.data[0]

      setSubscriptionTypeValue(`${amount}$ ${typeDescription.toLowerCase()}`)
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
              let value = `${amount}$ ${
                // typeDescription === 'SEMI_ANNUALLY' ? 'semiannually' :
                typeDescription.toLowerCase()
              }`

              // costs
              //   ? costs.map(({ amount, typeDescription }: any): any => {
              return (
                <Radio
                  key={amount}
                  callBack={onSubscriptionTypeChange}
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
