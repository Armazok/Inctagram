import React, { useState } from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { Payments } from '@/modules/profile-modules/account-managment/components/payments/Payments'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'

export const AccountManagement = () => {
  const [hasBusinessAccount, setHasBusinessAccount] = useState(false)

  return (
    <div>
      <AccountType
        setHasBusinessAccount={setHasBusinessAccount}
        hasBusinessAccount={hasBusinessAccount}
      />
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
