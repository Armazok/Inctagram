import React, { FC } from 'react'

import { FormLayout } from '@/components/FormLayout'
import { Captcha } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/captcha/Captcha'
import { GlobalButton, GlobalInput, NameTitle, Preloader } from '@/ui'

interface PropsType {
  isLoading: boolean
  handleSubmit: any
  submitData: any
  error: string | any
  register: any
  isCaptcha?: boolean
  disabled?: boolean
  onRecaptchaChange?: (token: string) => void
}

export const ResendVerificationForm: FC<PropsType> = ({
  isLoading,
  handleSubmit,
  submitData,
  error,
  register,
  disabled = false,
  isCaptcha = false,
  onRecaptchaChange,
}) => {
  const onRecaptchaChangeHandler = (token: string) => {
    if (onRecaptchaChange) {
      onRecaptchaChange(token)
    }
  }

  return (
    <FormLayout className="mt-[180px]">
      <div className="w-full">
        {isLoading && <Preloader />}
        <NameTitle
          nameTitle="Resend verification link"
          className="text-[20px] leading-[36px] text-light-100 font-bold text-center"
        />
        <form
          className="flex flex-col grow gap-[40px] pt-[22px] w-full  "
          onSubmit={handleSubmit(submitData)}
        >
          <GlobalInput type="email" label="Email" error={error} {...register('email')} />
          <GlobalButton type="submit" variant="default" disabled={disabled}>
            Send
          </GlobalButton>
          {isCaptcha && <Captcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />}
        </form>
      </div>
    </FormLayout>
  )
}
