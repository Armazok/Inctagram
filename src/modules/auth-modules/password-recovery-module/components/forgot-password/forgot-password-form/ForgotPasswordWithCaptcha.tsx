import React, { useState } from 'react'

// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha-enterprise'
import { FieldValues, SubmitHandler } from 'react-hook-form'

import { useGlobalForm } from '@/common'
import { forgotPassSchema } from '@/modules/auth-modules/password-recovery-module'
import { Captcha } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/captcha/Captcha'
import { GlobalButton, GlobalInput } from '@/ui'

type PropsType = {
  onSubmitHandler: (email: string, recaptcha: string) => void
}

export const ForgotPasswordWithCaptcha = ({ onSubmitHandler }: PropsType) => {
  const { errors, register, reset, handleSubmit, setCustomError } = useGlobalForm(forgotPassSchema)
  const [captcha, setCaptcha] = useState('')
  const onRecaptchaChange = (token: string) => {
    setCaptcha(token)
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { email } = data

    onSubmitHandler(email, captcha)
    reset()
  }

  return (
    <div className={'relative flex flex-col place-content-center w-4/5'}>
      <form
        className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <GlobalInput
          type="email"
          id="email"
          placeholder=""
          label="Email"
          //@ts-ignore
          error={errors?.email?.message}
          {...register('email')}
        />

        <div
          className={'pt-[18px] pb-[12px] text-[16px] leading-[24px] text-light-900 font-normal'}
        >
          Enter your email address and we will send you further instructions
        </div>
        <GlobalButton variant="default" type="submit" disabled={!captcha}>
          Send instructions
        </GlobalButton>
        <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />
      </form>
    </div>
  )
}
