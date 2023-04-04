import React, { FC, memo } from 'react'

import { useForm } from 'react-hook-form'

import style from './pageLogin.module.scss'

import FacebookSVG from '@/assets/icons/facebook-svgrepo.png'
import GoogleSVG from '@/assets/icons/google-svgrepo.png'
import Button from '@/components/atoms/buttons/button'
import Link from '@/components/atoms/link/Link'
import { LogOn } from '@/components/atoms/logOnByUsing/logOn'
import { NameTitle } from '@/components/atoms/title/nameTitle'
import { InputWithValidation } from '@/components/InputWithValidation/InputWithValidation'
import { useLoginMutation } from '@/services/api/auth/hoook'
interface ILogin {}

type Inputs = {
  email: string
  password: string
}

const Login: FC<ILogin> = memo(({}) => {
  const { mutate: login } = useLoginMutation()
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

  return (
    <div className={style.container}>
      <div className={style.loginForm}>
        <NameTitle nameTitle={'Sign In'} className={style.nameTitle} />
        <div className={'flex justify-around w-2/5'}>
          <LogOn height={'36px'} width={'36px'} urlImg={GoogleSVG} className={'mt-3.5'} />
          <LogOn height={'36px'} width={'36px'} urlImg={FacebookSVG} className={'mt-3.5'} />
        </div>
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
          <Link href={'/'} title={'Forgot Password?'} className={style.questionTitle} />
          <Button type={'submit'} textBtn={'Sign In'} callback={() => {}} />
        </form>
        <Link href={'/'} title={'Dont`t have an account?'} className={style.questionTitle} />
        <Link href={'/'} title={'Sign Up'} className={'text-blue-600'} />
      </div>
    </div>
  )
})

export default Login
