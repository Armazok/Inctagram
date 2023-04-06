import React from 'react'

import Link from 'next/link'
import { useForm } from 'react-hook-form'

import Preloader from '@/components/atoms/preloader/Preloader'
import { useLoginMutation } from '@/services/api/auth/hoook'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'
import InputWithEye from '@/ui/Inputs/InputWithEye/InputWithEye'

type Inputs = {
  email: string
  password: string
}

export const BlockLoginForm = () => {
  const { mutate: login, status } = useLoginMutation()
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<Inputs>()

  const handleFormSubmit = async ({ email, password }: Inputs) => {
    await login({
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
