import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import { ResendVerificationForm } from '@/components/AuthComponents'
import { useForgotPassword } from '@/modules/auth-modules/password-recovery-module'
import { FormDataRegistered, verificationSchema } from '@/modules/auth-modules/registraion-module'
import { CaptchaScript } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/reCaptcha/CaptchaScript'
import { getCaptcha } from '@/modules/auth-modules/password-recovery-module/utils/get-captcha'
export const ResendRecoveryForm = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, errors, setCustomError } =
    useGlobalForm(verificationSchema)

  const { sendLinkPasswordRecovery, isLoading } = useForgotPassword(setCustomError, reset, push)

  const submitData = (data: FormDataRegistered) => {
    const { email } = data
    sendLinkPasswordRecovery({ email })
    // getCaptcha(function (recaptcha: string): void {
    //   sendLinkPasswordRecovery({ email, recaptcha })
    // })
  }

  return (
    <>
      <CaptchaScript />
      <ResendVerificationForm
        isLoading={isLoading}
        submitData={submitData}
        handleSubmit={handleSubmit}
        error={errors?.email?.message}
        register={register}
      />
    </>
  )
}
