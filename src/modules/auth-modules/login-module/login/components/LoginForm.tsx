import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { FieldValues } from 'react-hook-form'

import { useGlobalForm } from '@/common'
import { schemaLogin, useLoginMutation } from '@/modules/auth-modules/login-module'
import { GlobalButton, GlobalInput, InputWithEye, Preloader } from '@/ui'

export const LoginForm = () => {
  const { setCustomError, handleSubmit, register, errors, reset } = useGlobalForm(schemaLogin)

  const { push } = useRouter()

  const { sendLoginData, isLoading, data } = useLoginMutation(
    () => {
      push('/profile')
    },
    () =>
      setCustomError(
        'password',
        'The password or the email or Username are incorrect. Try again, please'
      ),
    () => reset()
  )

  const handleFormSubmit = async ({ email, password }: FieldValues) => {
    await sendLoginData({
      email,
      password,
    })
  }

  return (
    <>
      {isLoading && <Preloader />}
      <form
        className="flex flex-col grow gap-[10px] pt-[22px]  pb-[18px] w-full gap-[24px]"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <GlobalInput
          type="email"
          id="email"
          placeholder="Email"
          label="Email"
          error={errors?.email?.message}
          {...register('email')}
        />
        <InputWithEye
          label="Password"
          id="password"
          placeholder="Password"
          error={errors?.password?.message}
          {...register('password')}
        />
        <Link
          href={'/auth/forgot-password'}
          className={'flex justify-end text-light-900 text-xs mt-2'}
        >
          Forgot password?
        </Link>
        <GlobalButton variant="default" type="submit">
          Sign In
        </GlobalButton>
      </form>
    </>
  )
}
