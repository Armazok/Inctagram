import React from 'react'

import Image from 'next/image'

import paypal from '@/assets/icons/paypal.png'
import stripe from '@/assets/icons/stripe.png'

export const PaymentMethods = () => {
  const onPaypalClick = () => {
    //     post request
  }
  const onStripeClick = () => {
    //     post request
  }

  return (
    <div className="flex gap-[60px] justify-end items-end mt-[24px]">
      <div
        className={'bg-dark-500 border-1 border-dark-300 mt-[6px] py-[5px] px-[5px] rounded-[5px]'}
      >
        <Image src={paypal} width={86} height={54} alt={'paypalIcon'} onClick={onPaypalClick} />
      </div>
      or
      <Image src={stripe} width={96} height={64} alt={'stripeIcon'} onClick={onStripeClick} />
    </div>
  )
}
