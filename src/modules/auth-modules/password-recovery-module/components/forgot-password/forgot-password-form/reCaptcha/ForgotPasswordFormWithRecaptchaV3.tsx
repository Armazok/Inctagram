import React from 'react'

import { FieldValues, SubmitHandler } from 'react-hook-form'

import { useGlobalForm } from '@/common'
import { forgotPassSchema } from '@/modules/auth-modules/password-recovery-module'
import { GlobalButton, GlobalInput } from '@/ui'
import { CaptchaScript } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/reCaptcha/CaptchaScript'
import { getCaptcha } from '@/modules/auth-modules/password-recovery-module/utils/get-captcha'

type PropsType = {
  onSubmitHandler: (email: string, recaptcha: string) => void
}

export const ReCaptchaFormV3 = ({ onSubmitHandler }: PropsType) => {
  const { errors, register, reset, handleSubmit, setCustomError } = useGlobalForm(forgotPassSchema)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { email } = data

    getCaptcha(function (recaptcha: string): void {
      onSubmitHandler(email, recaptcha)
    })
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
        <CaptchaScript />
        <GlobalButton variant="default" type="submit">
          Send instructions
        </GlobalButton>
      </form>
    </div>
  )
}
