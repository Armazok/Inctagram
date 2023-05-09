import React, { useState, useEffect } from 'react'

import { Radio } from '@/ui/Radio/Radio'

export const AccountType = () => {
  const hasBusinessAccount = false
  const defaultAccountType = hasBusinessAccount ? 'business' : 'personal'
  const [accountTypeValue, setAccountTypeValue] = useState(defaultAccountType)
  const accountTypes = ['personal', 'business']
  const onAccountTypeChange = (option: any) => {
    setAccountTypeValue(option)
  }

  useEffect(() => {
    //     getCosts
  }, [accountTypeValue === 'business'])

  return (
    <div className={'mb-[42px]'}>
      <h3>Account type:</h3>
      <div className={'bg-dark-300 border-1 border-b-dark-300 mt-[6px] py-[14px] px-[26px]'}>
        {accountTypes.map(type => {
          return <Radio key={type} callBack={onAccountTypeChange} name="accountType" value={type} />
        })}
      </div>
    </div>
  )
}
