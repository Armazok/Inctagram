import React from 'react'

import { NextPage } from 'next'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export interface CreateNewPasswordFormData {
  password: string
  passwordConfirmation: string
}

const CreateNewPassword: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateNewPasswordFormData>()

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { password, passwordConfirmation } = data

    console.log(data)
    reset()
  }

  return (
    <div>
      <h2>Create New Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<label>New password</label>*/}
        {/*<input {*/}
        {/*    ...register('password',*/}
        {/*        {required:*/}
        {/*                { value: true, message: 'This is required' },*/}
        {/*            // maxLength: MAX_LENGTH,*/}
        {/*            // minLength: MIN_LENGTH*/}
        {/*        })}  />*/}
        {/*<div>{<span>{errors.password?.message}</span>}</div>*/}
        {/*<label>Password confirmation</label>*/}
        {/*<input {...register('passwordConfirmation'), required: { value: true, message: 'This is required', validate: (value: string) => {*/}
        {/*           if (watch && watch('password') !== value) {*/}
        {/*           return 'Your passwords do no match';*/}
        {/*       }*/}
        {/*       }, }} />*/}
        {/*<div>{<span>{errors.passwordConfirmation?.message}</span>}</div>*/}
        {/*<button*/}
        {/*    type="button"*/}
        {/*    onClick={() => {}}*/}
        {/*>Create new password</button>*/}
      </form>
    </div>
  )
}

export default CreateNewPassword
