import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import paypal from '@/assets/icons/paypal.png'
import stripe from '@/assets/icons/stripe.png'
import { useSetSubscription } from '@/modules/profile-modules/account-managment/hooks/useSetSubscription'
import { useSubscription } from '@/modules/profile-modules/account-managment/store/subscriptionStore'
import { Preloader } from '@/ui'
export const PaymentMethods = () => {
  const router = useRouter()

  const { subscription, setPaymentType } = useSubscription()

  const onSuccess = (url: string) => {
    if (url) {
      router.push(url)
    }
  }
  const { isLoading, mutate: setSubscription } = useSetSubscription(onSuccess)
  const onPaypalClick = async () => {
    await setPaymentType('PAYPAL')
    setSubscription(subscription)
  }
  const onStripeClick = async () => {
    await setPaymentType('STRIPE')
    setSubscription(subscription)
  }

  if (isLoading) return <Preloader />

  return (
    <div className="flex gap-[60px] justify-end items-end mt-[24px]">
      {/*<div*/}
      {/*  className={'bg-dark-500 border-1 border-dark-300 mt-[6px] py-[5px] px-[5px] rounded-[5px]'}*/}
      {/*>*/}
      {/*  <Image src={paypal} width={86} height={54} alt={'paypalIcon'} onClick={onPaypalClick} />*/}
      {/*</div>*/}
      {/*or*/}
      <Image src={stripe} width={96} height={64} alt={'stripeIcon'} onClick={onStripeClick} />
    </div>
  )
}
