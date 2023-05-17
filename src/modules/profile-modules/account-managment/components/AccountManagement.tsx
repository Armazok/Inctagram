import React, { useState } from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { PaymentMethods } from '@/modules/profile-modules/account-managment/components/payments/payment-methods/PaymentMethods'
import { PaymentConfirmationModals } from '@/modules/profile-modules/account-managment/components/payments/PaymentsConfirmationModals'
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
        <>
          <SubscriptionType />
          <PaymentMethods />
        </>
      )}
      <PaymentConfirmationModals />
    </div>
  )
}
