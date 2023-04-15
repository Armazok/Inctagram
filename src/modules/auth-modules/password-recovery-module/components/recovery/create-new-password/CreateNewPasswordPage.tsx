import React from 'react'

import { useRouter } from 'next/router'

import { FormLayout } from '@/components/FormLayout'
import {
  CreateNewPasswordForm,
  useCreateNewPasswordMutation,
} from '@/modules/auth-modules/password-recovery-module'
import { NameTitle, Preloader } from '@/ui'

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
