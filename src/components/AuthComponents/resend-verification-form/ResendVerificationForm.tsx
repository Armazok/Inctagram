import React, { FC } from 'react'

import Preloader from '@/components/atoms/preloader/Preloader'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import FormLayout from '@/components/FormLayout/FormLayout'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'

interface PropsType {
  isLoading: boolean
  handleSubmit: any
  submitData: any
  error: string | any
  register: any
}

const ResendVerificationForm: FC<PropsType> = ({
  isLoading,
  handleSubmit,
  submitData,
  error,
  register,
}) => {
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
          <GlobalButton type="submit" variant="default">
            Send
          </GlobalButton>
        </form>
      </div>
    </FormLayout>
  )
}

export default ResendVerificationForm
