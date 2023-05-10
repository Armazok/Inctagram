import React from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { CurrentSubscription } from '@/modules/profile-modules/account-managment/components/current-subscription/CurrentSubscription'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'

export const AccountManagement = () => {
  return (
    <div>
      <CurrentSubscription />
      <AccountType />
      <SubscriptionType />
    </div>
  )
}
