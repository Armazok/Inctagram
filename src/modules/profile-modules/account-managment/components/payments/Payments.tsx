import React, { useState } from 'react'

import { Confirm } from '@/components/modals'
import { PaymentMethods } from '@/modules/profile-modules/account-managment/components/payments/payment-methods/PaymentMethods'

export const Payments = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIisErrorModalOpen] = useState(false)

  const onErrorClose = () => {
    setIisErrorModalOpen(false)
  }

  const onSuccessClose = () => {
    setIsSuccessModalOpen(false)
  }

  return (
    <div>
      <PaymentMethods />
      {
        // if payment is successful

        // <Confirm
        //     isOpen={isSuccessModalOpen}
        //     onConfirm={onSuccessClose}
        //     onClose={onSuccessClose}
        //     confirmButtonText={'Ok'}
        //     title={'Success'}
        //     text={'Payment was successful!'}
        // />

        // if payment is not successful
        <Confirm
          isOpen={isErrorModalOpen}
          onConfirm={onErrorClose}
          onClose={onErrorClose}
          confirmButtonText={'Back to payment'}
          title={'Error'}
          text={'Transaction failed, please try again'}
        />
      }
    </div>
  )
}
