import React, { useState } from 'react'

import { NextPage } from 'next'

import { Confirm } from '@/components/modals'
import { useForgotPassword } from '@/modules/auth-modules/password-recovery-module'
import { ForgotPasswordWithCaptcha } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/ForgotPasswordWithCaptcha'
import { NameTitle, Preloader } from '@/ui'
import Link from '@/ui/link/Link'

export const ForgotPassword: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSuccess = () => {
    setIsModalOpen(true)
  }
  const { sendLinkPasswordRecovery, isLoading, variables } = useForgotPassword(onSuccess)

  const onConfirm = () => {
    setIsModalOpen(false)
  }

  const onSubmitHandler = async (email: string, recaptcha: string) => {
    await sendLinkPasswordRecovery({ email, recaptcha })
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

  if (isLoading) return <Preloader />

  return (
    <div
      className={
        'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
      }
    >
      <NameTitle nameTitle={'Forgot Password'} className={'text-light-100 mt-6'} />

      <ForgotPasswordWithCaptcha onSubmitHandler={onSubmitHandler} />

      <Confirm
        isOpen={isModalOpen}
        onConfirm={onConfirm}
        onClose={onClose}
        title={'Email sent'}
        text={`The link has been sent to your email ${variables?.email}. If you don’t receive an email send link again.`}
        confirmButtonText={'Ok'}
      />

      <Link
        href={'/auth/login'}
        title={'Back to Sign In'}
        className={'font-semibold text-[16px] leading-[24px] text-accent-500 mt-2 mb-4'}
      />
    </div>
  )
}
