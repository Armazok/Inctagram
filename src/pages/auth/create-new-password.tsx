import React from 'react'

import { useRouter } from 'next/router'

import { NameTitle } from '@/components/atoms/title/nameTitle'
import CreateNewPasswordForm from '@/modules/passwordRecovery/createNewPassword/CreateNewPasswordForm'
import style from '@/pages/auth/pageLogin.module.scss'
import { useCreateNewPasswordMutation } from '@/services/api/auth/hoook'

const CreateNewPassword = () => {
  const router = useRouter()

  const recoveryCode = 'placeholder'
  const { mutate } = useCreateNewPasswordMutation()

  const onSubmitHandler = (newPassword: string) => {
    mutate({ newPassword, recoveryCode })
    // router.push('/auth/login')
  }

  return (
    <div className={style.container}>
      <div
        className={
          'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
        }
      >
        <NameTitle nameTitle={'Create New Password'} className={style.nameTitle} />
        <CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  )
}

export default CreateNewPassword
