import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import Preloader from '@/components/atoms/preloader/Preloader'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import FormLayout from '@/components/FormLayout/FormLayout'
import {
  FormData,
  verificationSchema,
} from '@/modules/resend-verification-form/constants/verificationSchema'
import { useSendVerifyEmailMutation } from '@/modules/resend-verification-form/hooks/useSendVerifyEmailMutation'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'

export const ResendVerificationForm = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, setCustomError, errors } =
    useGlobalForm(verificationSchema)

  const { isLoading, resendVerification } = useSendVerifyEmailMutation(setCustomError, reset, push)

  const submitData = (data: FormData) => {
    resendVerification(data)
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
          <GlobalInput
            type="email"
            label="Email"
            error={errors.email?.message}
            placeholder="Restore verification"
            {...register('email')}
          />
          <GlobalButton type="submit" variant="default">
            Send
          </GlobalButton>
        </form>
      </div>
    </FormLayout>
  )
}
