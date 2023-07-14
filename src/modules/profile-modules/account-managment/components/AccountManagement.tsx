import React, { useState, useEffect } from 'react'

import { AccountType } from '@/modules/profile-modules/account-managment/components/account-type/AccountType'
import { CurrentSubscription } from '@/modules/profile-modules/account-managment/components/current-subscription/CurrentSubscription'
import { PaymentMethods } from '@/modules/profile-modules/account-managment/components/payments/payment-methods/PaymentMethods'
import { PaymentConfirmationModals } from '@/modules/profile-modules/account-managment/components/payments/PaymentsConfirmationModals'
import { SubscriptionType } from '@/modules/profile-modules/account-managment/components/subscription-type/SubscriptionType'
import { useGetCurrentSubscription } from '@/modules/profile-modules/account-managment/hooks/useGetCurrentSubscription'
import { useUserStore } from '@/store'

export const AccountManagement = () => {
  const { currentSubscriptions } = useGetCurrentSubscription()
  const { hasBusinessAccount, setHasBusinessAccount } = useUserStore()
  const hasCurrentSubscriptions = currentSubscriptions && !!currentSubscriptions.data.length
  const [isSwitchedToBusiness, setIsSwitchedToBusiness] = useState(hasBusinessAccount || false)

  useEffect(() => {
    setIsSwitchedToBusiness(hasBusinessAccount)
  }, [hasBusinessAccount])

  return (
    <div>
      {hasCurrentSubscriptions && <CurrentSubscription />}
      <AccountType
        setIsSwitchedToBusiness={setIsSwitchedToBusiness}
        isSwitchedToBusiness={isSwitchedToBusiness}
      />
      {isSwitchedToBusiness || hasBusinessAccount ? (
        <>
          <SubscriptionType />
          <PaymentMethods />
        </>
      ) : (
        ''
      )}
      <PaymentConfirmationModals />
    </div>
  )
}
