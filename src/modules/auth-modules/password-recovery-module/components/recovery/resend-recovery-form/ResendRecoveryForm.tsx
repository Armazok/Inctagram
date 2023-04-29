import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { PATH_ROUTE, useGlobalForm } from '@/common'
import { ResendVerificationForm } from '@/components/auth-components'
import { useForgotPassword } from '@/modules/auth-modules/password-recovery-module/hooks/useForgotPassword'
import { FormDataRegistered, verificationSchema } from '@/modules/auth-modules/registraion-module'

export const ResendRecoveryForm = () => {
  const { push } = useRouter()
  const [captcha, setCaptcha] = useState('')

  const { handleSubmit, register, reset, errors, setCustomError } =
    useGlobalForm(verificationSchema)

  const onSuccess = () => {
    push(PATH_ROUTE.LOGIN)
    reset()
  }
  const { sendLinkPasswordRecovery, isLoading } = useForgotPassword(onSuccess, setCustomError)

  const onRecaptchaChange = (token: string) => {
    setCaptcha(token)
  }

  const submitData = (data: FormDataRegistered) => {
    const { email } = data

    sendLinkPasswordRecovery({ email, recaptcha: captcha })
  }

  return (
    <>
      <ResendVerificationForm
        isLoading={isLoading}
        submitData={submitData}
        handleSubmit={handleSubmit}
        error={errors?.email?.message}
        register={register}
        isCaptcha={true}
        onRecaptchaChange={onRecaptchaChange}
        disabled={!captcha}
      />
    </>
  )
}
