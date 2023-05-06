import React from 'react'

import { useRouter } from 'next/router'

import { PATH_ROUTE } from '@/common'
import { FormLayout } from '@/components/FormLayout'
import { CreateNewPasswordForm } from '@/modules/auth-modules/password-recovery-module'
import { useCreateNewPassword } from '@/modules/auth-modules/password-recovery-module/hooks/useCreateNewPassword'
import { NameTitle, Preloader } from '@/ui'

type PropsType = {
  recoveryCode: string
}

export const CreateNewPasswordPage = ({ recoveryCode = '' }: PropsType) => {
  const router = useRouter()

  const { mutate: createNewPassword, isLoading } = useCreateNewPassword()

  const onSubmitHandler = async (newPassword: string) => {
    await createNewPassword({ newPassword, recoveryCode })
    router.push(PATH_ROUTE.LOGIN)
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
