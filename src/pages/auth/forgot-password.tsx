import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { NextPage } from 'next'

import Link from '@/components/atoms/link/Link'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import { Confirm } from '@/components/modals/confirm/Confirm'
import ForgotPasswordForm from '@/modules/passwordRecovery/forgotPassword/ForgotPasswordForm'
import style from '@/pages/auth/pageLogin.module.scss'
import { authAPI } from '@/services/api/auth/authAPI'
import { useUserStore } from '@/store'

const ForgotPassword: NextPage = () => {
  const { email } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutate } = useMutation({
    mutationFn: authAPI.passwordRecovery,
    onSuccess: () => {
      setIsModalOpen(true)
    },
  })

  const onConfirm = () => {
    setIsModalOpen(false)
  }

  const onSubmitHandler = (email: string) => {
    mutate({ email })
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={style.container}>
      <div
        className={
          'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
        }
      >
        <NameTitle nameTitle={'Forgot Password'} className={style.nameTitle} />

        <ForgotPasswordForm onSubmitHandler={onSubmitHandler} />

        <Confirm
          isOpen={isModalOpen}
          onConfirm={onConfirm}
          onClose={onClose}
          title={'Email sent'}
          text={`We have sent a link to confirm your email to ${email}`}
          confirmButtonText={'Ok'}
        />

        <Link href={'/auth/login'} title={'Back to Sign In'} className={'text-blue-600'} />
      </div>
    </div>
  )
}

export default ForgotPassword
