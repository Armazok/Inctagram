import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import ResendVerificationForm from '@/components/AuthComponents/resend-verification-form/ResendVerificationForm'
import { useRecoveryEmailResending } from '@/modules/auth-modules/password-recovery-module/api/hook'
import {
  FormData,
  schema,
} from '@/modules/auth-modules/password-recovery-module/constants/forgotPasswordValidateSchema'

export const ResendRecoveryForm = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, errors, setCustomError } = useGlobalForm(schema)

  const { resendRecoverCode, isLoading } = useRecoveryEmailResending(setCustomError, reset, push)

  const submitData = (data: FormData) => {
    const { email } = data

    resendRecoverCode({ email })
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
