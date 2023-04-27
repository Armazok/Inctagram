import React from 'react'

import Link from 'next/link'

import { FormLayout } from '@/components/FormLayout'
import { LoginForm } from '@/modules/auth-modules/login-module'
import { GoogleFacebook, NameTitle } from '@/ui'

export const Login = ({}) => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle nameTitle={'Sign In'} className={'font-bold text-light-100 text-xl leading-9'} />
      <GoogleFacebook />
      <LoginForm />
      <span className="pb-[12px] text-[16px] leading-[24px] text-light-100 font-normal">
        Don`t have account?
      </span>
      <Link
        href={'/auth/registration'}
        className="font-semibold text-[16px] leading-[24px] text-accent-500"
      >
        Sing Up
      </Link>
    </FormLayout>
  )
}
