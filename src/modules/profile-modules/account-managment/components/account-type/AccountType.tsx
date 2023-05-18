import React, { useState } from 'react'

import { Radio } from '@/ui/radio/Radio'

const accountTypes = ['Personal', 'Business']

type PropsType = {
  setIsSwitchedToBusiness: (isSwitchedToBusiness: boolean) => void
  isSwitchedToBusiness: boolean
}

export const AccountType = ({ setIsSwitchedToBusiness, isSwitchedToBusiness }: PropsType) => {
  const defaultAccountType = isSwitchedToBusiness ? 'Business' : accountTypes[0]
  const [accountTypeValue, setAccountTypeValue] = useState(defaultAccountType)

  const onAccountTypeChange = (option: any) => {
    if (option === 'Business') {
      setIsSwitchedToBusiness(true)
    } else {
      setIsSwitchedToBusiness(false)
    }

    setAccountTypeValue(option)
  }

  return (
    <div className={'mb-[42px]'}>
      <h3 className={'text-blue-50'}>Account type:</h3>
      <div
        className={
          'bg-dark-300 border-1 border-dark-300 mt-[6px] py-[14px] px-[26px] rounded-[5px]'
        }
      >
        {accountTypes.map(value => {
          return (
            <Radio
              key={value}
              callBack={onAccountTypeChange}
              name="accountType"
              value={value}
              checked={value === accountTypeValue}
              id={value}
            />
          )
        })}
      </div>
    </div>
  )
}
