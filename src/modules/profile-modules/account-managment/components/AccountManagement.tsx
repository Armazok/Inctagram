import React, { useState } from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { CurrentSubscription } from '@/modules/profile-modules/account-managment/components/current-subscription/CurrentSubscription'
import { Payments } from '@/modules/profile-modules/account-managment/components/payments/Payments'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'
import { useGetCurrentSubscription } from '@/modules/profile-modules/account-managment/hooks/useGetCurrentSubscription'

export const AccountManagement = () => {
  const [hasBusinessAccount, setHasBusinessAccount] = useState(false)
  const { currentSubscriptions } = useGetCurrentSubscription()

  const hasCurrentSubscriptions = currentSubscriptions && !!currentSubscriptions.data.length

  return (
    <div>
      {hasCurrentSubscriptions && <CurrentSubscription />}
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
