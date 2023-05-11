import React, { useState } from 'react'

import { Radio } from '@/ui/radio/Radio'
import { accountAPI } from '@/modules/profile-modules/account-managment/api/account-api'
// import { Radio } from '@/ui/Radio/Radio'

export const getStaticProps = async () => {
  const costs = await accountAPI.getCosts()

  return {
    props: { costs },
  }
}

type PropsType = {
  costs: any
}

export const SubscriptionType = () => {
  const costs = ['10', '500', '700']
  // const hasBusinessAccount = true

  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('10')
  // useEffect(() => {
  //   //     getCosts
  // }, [hasBusinessAccount === true])
  const onSubscriptionTypeChange = (option: any) => {
    setSubscriptionTypeValue(option)
  }

  return (
    <div>
      <h3>Your subscription costs:</h3>
      <div className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px]'}>
        {costs.map((value, index) => {
          return (
            <Radio
              key={value}
              callBack={onSubscriptionTypeChange}
              name="subscriptionType"
              value={value}
              checked={value === subscriptionTypeValue}
              id={value}
            />
          )
        })}
      </div>
    </div>
  )
}
