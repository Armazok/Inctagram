import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { ResendVerificationForm } from '@/components/AuthComponents'
import { useForgotPassword } from '@/modules/auth-modules/password-recovery-module'
import { FormDataRegistered, registrationSchema } from '@/modules/auth-modules/registraion-module'
export const ResendRecoveryForm = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, errors, setCustomError } =
    useGlobalForm(registrationSchema)

  const { sendLinkPasswordRecovery, isLoading } = useForgotPassword(setCustomError, reset, push)

  const submitData = (data: FormDataRegistered) => {
    const { email } = data
    sendLinkPasswordRecovery({ email })
  }

  return (
    <ResendVerificationForm
      isLoading={isLoading}
      submitData={submitData}
      handleSubmit={handleSubmit}
      error={errors?.email?.message}
      register={register}
    />
  )
}
