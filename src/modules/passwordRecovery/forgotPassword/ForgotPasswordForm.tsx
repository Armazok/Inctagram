import React from 'react'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/atoms/buttons/button'
import { InputWithValidation } from '@/components/InputWithValidation/InputWithValidation'

const MAX_LENGTH_EMAIL = 100
const MIN_LENGTH_EMAIL = 5

type PropsType = {
  onSubmitHandler: (email: string) => void
}

const ForgotPasswordForm = ({ onSubmitHandler }: PropsType) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', defaultValues: { email: '' } })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { email } = data

    console.log(email)
    onSubmitHandler(email)
    reset()
  }

  return (
    <div className={'relative flex flex-col place-content-center w-4/5'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithValidation
          type={'text'}
          name={'email'}
          label={'Email'}
          maxLength={MAX_LENGTH_EMAIL}
          minLength={MIN_LENGTH_EMAIL}
          errors={errors.email ? errors.email : undefined}
          control={control}
        />

        <div>Enter your email address and we will send you further instructions</div>
        <Button type={'submit'} textBtn={'Send instructions'} tag={'btn'} callback={() => {}} />
      </form>
    </div>
  )
}

export default ForgotPasswordForm
