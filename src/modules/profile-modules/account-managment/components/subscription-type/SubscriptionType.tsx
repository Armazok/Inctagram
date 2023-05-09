import React, { useState, useEffect } from 'react'

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
  const hasBusinessAccount = true

  // const [subscriptionTypeValue, setSubscriptionTypeValue] = useState('10$')
  useEffect(() => {
    //     getCosts
  }, [hasBusinessAccount === true])
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
