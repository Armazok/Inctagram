import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import { ResendVerificationForm } from '@/components/auth-components'
import {
  FormDataVerification,
  useSendVerifyEmail,
  verificationSchema,
} from '@/modules/auth-modules/registraion-module'

export const ResendVerificationEmail = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, setCustomError, errors } =
    useGlobalForm(verificationSchema)

  const { isLoading, resendVerification } = useSendVerifyEmail(
    setCustomError,
    () => reset(),
    () => push(PATH_ROUTE.LOGIN)
  )

  const submitData = (data: FormDataVerification) => {
    resendVerification(data)
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
