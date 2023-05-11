import React, { useState } from 'react'

import { FieldValues, SubmitHandler } from 'react-hook-form'

import { useGlobalForm } from '@/common'
import { Confirm } from '@/components/modals'
import { forgotPassSchema } from '@/modules/auth-modules/password-recovery-module'
import { Captcha } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/captcha/Captcha'
import { useForgotPassword } from '@/modules/auth-modules/password-recovery-module/hooks/useForgotPassword'
import { GlobalButton, GlobalInput, Preloader } from '@/ui'

export const ForgotPasswordWithCaptcha = () => {
  const { errors, register, reset, handleSubmit, setCustomError } = useGlobalForm(forgotPassSchema)
  const [captcha, setCaptcha] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirm = () => {
    setIsModalOpen(false)
  }
  const onClose = () => {
    setIsModalOpen(false)
  }

  const onSuccess = () => {
    setIsModalOpen(true)
    setCaptcha('')
  }

  const { sendLinkPasswordRecovery, isLoading, variables } = useForgotPassword(
    onSuccess,
    (field: string, massage: string) => {
      setCustomError(field, massage)
      setCaptcha('')
    }
  )

  const onSubmitHandler = async (email: string, recaptcha: string) => {
    await sendLinkPasswordRecovery({ email, recaptcha })
  }

  const onRecaptchaChange = (token: string) => {
    setCaptcha(token)
  }

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const { email } = data

    onSubmitHandler(email, captcha)
    reset()
  }

  if (isLoading) return <Preloader />

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
          className={'pt-[25px] pb-[12px] text-[16px] leading-[24px] text-light-900 font-normal'}
        >
          Enter your email address and we will send you further instructions
        </div>
        <GlobalButton variant="default" type="submit" disabled={!captcha}>
          Send instructions
        </GlobalButton>
        <Captcha onRecaptchaChangeHandler={onRecaptchaChange} />
      </form>

      <Confirm
        isOpen={isModalOpen}
        onConfirm={onConfirm}
        onClose={onClose}
        title={'Email sent'}
        text={`The link has been sent to your email ${variables?.email}. If you don’t receive an email send link again.`}
        confirmButtonText={'Ok'}
      />
    </div>
  )
}
