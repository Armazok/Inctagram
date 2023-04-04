import React from 'react'

import { NextPage } from 'next'

import Link from '@/components/atoms/link/Link'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import { Confirm } from '@/components/modals/confirm/Confirm'
import ForgotPasswordForm from '@/modules/passwordRecovery/forgotPassword/ForgotPasswordForm'
import style from '@/pages/auth/pageLogin.module.scss'
import { useForgotPassMutation } from '@/services/api/auth/hoook'
import { useUserStore } from '@/store'

const ForgotPassword: NextPage = () => {
  const { mutate: forgotPass } = useForgotPassMutation()
  const { state, isModalOpen, setIsModalOpen, setEmail } = useUserStore()
  const { email } = state

  const onSubmitHandler = (email: string) => {
    forgotPass({ email })
    setEmail(email)
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
          onConfirm={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
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
