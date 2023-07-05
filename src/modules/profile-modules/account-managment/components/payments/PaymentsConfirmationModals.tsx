import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { Confirm } from '@/components/modals'

export const PaymentConfirmationModals = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true)
  const [isErrorModalOpen, setIisErrorModalOpen] = useState(true)

  const { query, replace, pathname } = useRouter()

  const onErrorClose = () => {
    setIisErrorModalOpen(false)
    replace(pathname)
  }

  const onSuccessClose = () => {
    setIsSuccessModalOpen(false)
    replace(pathname)
  }

  return (
    <div>
      {query?.success === 'true' && (
        <Confirm
          isOpen={isSuccessModalOpen}
          onConfirm={onSuccessClose}
          onClose={onSuccessClose}
          confirmButtonText={'Ok'}
          title={'Success'}
          text={'Payment was successful!'}
        />
      )}
      {query.success === 'false' && (
        <Confirm
          isOpen={isErrorModalOpen}
          onConfirm={onErrorClose}
          onClose={onErrorClose}
          confirmButtonText={'Back to payment'}
          title={'Error'}
          text={'Transaction failed, please try again'}
        />
      )}
    </div>
  )
}
