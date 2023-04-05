import React, { FC, memo } from 'react'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/buttons/button'
import Link from '@/components/atoms/link/Link'
import Preloader from '@/components/atoms/preloader/Preloader'
import { InputWithValidation } from '@/components/InputWithValidation/InputWithValidation'
import { useLoginMutation } from '@/services/api/auth/hoook'

type Inputs = {
  email: string
  password: string
}

interface ILoginForm {}
export const BlockLoginForm: FC<ILoginForm> = memo(({}) => {
  const router = useRouter()

  const { mutate: login, status } = useLoginMutation()
  const {
    control,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<Inputs>()

  const handleFormSubmit = async ({ email, password }: Inputs) => {
    await login({
      email,
      password,
    })
  }

  if (status === 'loading') return <Preloader />
  if (status === 'success') {
    router.push('/auth/register')
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputWithValidation
          type={'email'}
          name={'email'}
          label={'Email'}
          control={control}
          errors={errors.email ? errors.email : undefined}
          maxLength={25}
          minLength={5}
        />
        <InputWithValidation
          type={'password'}
          name={'password'}
          label={'Password'}
          control={control}
          errors={errors.password ? errors.password : undefined}
          maxLength={10}
          minLength={5}
        />
        <Link href={'/'} title={'Forgot Password?'} className={'text-blue-600'} />
        <Button type={'submit'} textBtn={'Sign In'} callback={() => {}} />
      </form>
    </>
  )
})
