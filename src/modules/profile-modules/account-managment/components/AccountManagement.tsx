import React, { useEffect, useState } from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { Payments } from '@/modules/profile-modules/account-managment/components/payments/Payments'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'

export const AccountManagement = () => {
  // const [accountTypeValue, setAccountTypeValue] = useState(defaultAccountType)

  let hasBusinessAccount = true

  // const isSwitchedToBusiness = true

  // useEffect(() => {
  //   //     getCosts
  // }, [hasBusinessAccount === true])

  return (
    <div>
      <AccountType />
      {hasBusinessAccount && (
        // || (isSwitchedToBusiness
        <>
          <SubscriptionType />
          <Payments />
        </>
      )}
    </div>
  )
}
