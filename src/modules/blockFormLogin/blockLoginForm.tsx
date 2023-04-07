import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { mutate: login, isLoading, isSuccess, isError } = useLoginMutation()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  const handleFormSubmit = async ({ email, password }: Inputs) => {
    try {
      await login({
        email,
        password,
      })
    } catch (e) {
      router.push('/')
    }
  }

  if (isLoading) return <Preloader />
  if (isSuccess) {
    router.push('/future/future')
  }
  if (isError)
    return (
      <div className={'flex m-7 text-center'}>
        Решил оставить минимализм, к слову запрос упал. <br />
        Либо пароль, либо мыло неверно
      </div>
    )

  return (
    <>
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
