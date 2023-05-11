import React from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'

export const AccountManagement = () => {
  return (
    <div>
      <AccountType />
      <SubscriptionType />
    </div>
  )
}
