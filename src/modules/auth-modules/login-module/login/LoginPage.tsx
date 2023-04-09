import React from 'react'

import Link from 'next/link'

import { NameTitle } from '@/components/atoms/title/nameTitle'
import FormLayout from '@/components/FormLayout/FormLayout'
import { LoginForm } from '@/modules/auth-modules/login-module/login/components/LoginForm'
import GoogleFacebook from '@/ui/GoogleFacebook/GoogleFacebook'

export const LoginPage = ({}) => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle={'Sign In'}
        className={'font-bold text-light-100 text-[20px] leading-[36px]'}
      />
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
