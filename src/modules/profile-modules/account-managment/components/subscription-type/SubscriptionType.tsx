import React, { useState } from 'react'

import { Radio } from '@/ui/Radio/Radio'

export const SubscriptionType = () => {
  // const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('10$')
  const onSubscriptionTypeChange = (option: any) => {
    //     setAccountTypeValue(option)
  }

  return (
    <div>
      <h3>Your subscription costs:</h3>
      <div className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px]'}>
        <Radio
          callBack={onSubscriptionTypeChange}
          name="accountType"
          value="10$"
          disabled={false}
        />
      </div>
    </div>
  )
}
