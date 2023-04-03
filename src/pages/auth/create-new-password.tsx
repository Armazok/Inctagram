import React from 'react'

import { NextPage } from 'next'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import style from './registration.module.scss'

import containerBlock from '@/styles/container.module.scss'
import {InputWithValidation} from '@/components/InputWithValidation/InputWithValidation';

// export interface CreateNewPasswordFormData {
//   password: string
//   passwordConfirmation: string
// }


const MAX_LENGTH = 20;
const MIN_LENGTH = 6;

const CreateNewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const { password, passwordConfirmation } = data

    console.log(errors)
    reset()
  }

  return (
    <div
        // className={`${containerBlock.container} ${style.registerBlock}`}
    >
      <div className={style.formContainer}>
        <h2>Create New Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <InputWithValidation name={'password'}
                               label={"New password"}
                               register={register}
                               maxLength={MAX_LENGTH}
                               minLength={MIN_LENGTH}
                               errors={errors.password ? errors.password : undefined}
          />


          <InputWithValidation name={'passwordConfirmation'}
                               label={"Password confirmation"}
                               register={register}
                               maxLength={MAX_LENGTH}
                               minLength={MIN_LENGTH}
                               errors={errors.passwordConfirmation ? errors.passwordConfirmation : undefined}
                               watch={watch}
          />

          {/*<label>New password</label>*/}
          {/*<input {*/}
          {/*    ...register('password',*/}
          {/*        {required: { value: true, message: 'This is required'},*/}
          {/*            maxLength: { value: MAX_LENGTH, message: `Max length exceeded, ${MAX_LENGTH} symbols`},*/}
          {/*            minLength: { value: MIN_LENGTH, message: `Max length exceeded, ${MIN_LENGTH} symbols`},*/}
          {/*        })*/}
          {/*         // ,pattern*/}
          {/*}*/}
          {/*/>*/}
          {/*<div style={{width: '200px', color: 'red'}}>{ <span> Error: {errors.password?.message}</span>}</div>*/}

          {/*<label>Password confirmation</label>*/}
          {/*<input*/}
          {/*    {...register('passwordConfirmation',*/}
          {/*        { required: { value: true, message: 'This is required'},*/}
          {/*          maxLength: { value: MAX_LENGTH, message: `Max length exceeded, ${MAX_LENGTH} symbols`},*/}
          {/*          minLength: { value: MIN_LENGTH, message: `Min length is ${MIN_LENGTH} symbols`},*/}
          {/*         validate: (value: string) => {*/}
          {/*          //@ts-ignore*/}
          {/*            if (watch && watch('password') !== value) {*/}
          {/*            return 'Your passwords do no match';*/}
          {/*            }},*/}
          {/*          // pattern*/}
          {/*        }*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
          <button type="submit" onClick={() => {}}>
            Create new password
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewPassword;
