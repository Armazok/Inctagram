import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { FieldValues } from 'react-hook-form'

import { useGlobalForm } from '@/common'
import Preloader from '@/components/atoms/preloader/Preloader'
import { schemaLogin } from '@/modules/auth-modules/login-module/login/constants/loginValidationSchema'
import { useLoginMutation } from '@/modules/auth-modules/login-module/login/hooks/useLogin'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'
import InputWithEye from '@/ui/Inputs/InputWithEye/InputWithEye'

export const LoginForm = () => {
  const router = useRouter()

  const { setCustomError, handleSubmit, register, errors } = useGlobalForm(schemaLogin)

  const { sendLoginData, isLoading } = useLoginMutation(
    () => router.push('future/future'),
    () => setCustomError
  )

  const handleFormSubmit = async ({ email, password }: FieldValues) => {
    try {
      await sendLoginData({
        email,
        password,
      })
    } catch (e) {
      router.push('/')
    }
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
        <Link href={'/auth/forgot-password'} className={'flex justify-end text-light-900 text-xs'}>
          Forgot password?
        </Link>
        <GlobalButton variant="default" type="submit">
          Sign In
        </GlobalButton>
      </form>
    </>
  )
}