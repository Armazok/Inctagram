import React from 'react'

import { useRouter } from 'next/router'

import Preloader from '@/components/atoms/preloader/Preloader'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import FormLayout from '@/components/FormLayout/FormLayout'
import { useCreateNewPasswordMutation } from '@/modules/auth-modules/password-recovery-module/api/hook'
import CreateNewPasswordForm from '@/modules/auth-modules/password-recovery-module/components/recovery/create-new-password/create-new-password-form/CreateNewPasswordForm'

type PropsType = {
  recoveryCode: string
}

export const CreateNewPasswordPage = ({ recoveryCode = '' }: PropsType) => {
  const router = useRouter()

  const { mutate: createNewPassword, isLoading } = useCreateNewPasswordMutation()

  const onSubmitHandler = async (newPassword: string) => {
    await createNewPassword({ newPassword, recoveryCode })
    router.push('/')
  }

  if (isLoading) return <Preloader />

  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle={'Create New Password'}
        className="font-bold text-light-100 text-[20px] leading-[36px]"
      />
      <CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />
    </FormLayout>
  )
}
