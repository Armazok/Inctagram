import React, { FC } from 'react'

import { useForm } from 'react-hook-form'

import style from './pageLogin.module.scss'

import FacebookSVG from '@/assets/icons/facebook-svgrepo.png'
import GoogleSVG from '@/assets/icons/google-svgrepo.png'
import Button from '@/components/atoms/buttons/button'
import { Input } from '@/components/atoms/input+pass+showEye/input'
import { LogOn } from '@/components/atoms/logOnByUsing/logOn'
import { QuestionsTitle } from '@/components/atoms/questionsTitle/questionsTitle'
import { NameTitle } from '@/components/atoms/title/nameTitle'
interface ILogin {}

type Inputs = {
  email: string
  password: string
}

const PageLogin: FC<ILogin> = ({}) => {
  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
  } = useForm<Inputs>()

  const handleFormSubmit = (data: Inputs) => {}

  return (
    <div className={style.container}>
      <div
        className={
          'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'
        }
      >
        <NameTitle nameTitle={'Sign In'} className={style.nameTitle} />
        <div className={'flex justify-around w-2/5'}>
          <LogOn height={'36px'} width={'36px'} urlImg={GoogleSVG} className={'mt-3.5'} />
          <LogOn height={'36px'} width={'36px'} urlImg={FacebookSVG} className={'mt-3.5'} />
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Input
              {...register('email')}
              typeInput={'email'}
              labelName={'Email'}
              placeholder={'Email'}
            />
            <Input
              {...register('password')}
              typeInput={'password'}
              labelName={'Password'}
              placeholder={'Password'}
            />
          </div>
          <QuestionsTitle className={style.questionTitle} title={'Forgot Password?'} />
          <Button type={'submit'} textBtn={'Sign In'} tag={'btn'} callback={() => {}} />
        </form>
        <QuestionsTitle className={style.questionTitle} title={'Dont`t have an account?'} />
        <div className={'text-blue-600'}>Sign Up</div>
      </div>
    </div>
  )
}

export default PageLogin
