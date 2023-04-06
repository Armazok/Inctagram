import React from 'react'

import Link from 'next/link'

import { NameTitle } from '@/components/atoms/title/nameTitle'
import FormLayout from '@/components/FormLayout/FormLayout'
import RegistrationForm from '@/modules/registration/components/registraion-form/RegistrationForm'
import GoogleFacebook from '@/ui/GoogleFacebook/GoogleFacebook'

export const RegisterPage = () => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle="Sing Up"
        className="font-bold text-light-100 text-[20px] leading-[36px]"
      />
      <GoogleFacebook />
      <RegistrationForm />
      <Link
        href={'page-registration/resend-form'}
        className="font-semibold text-[16px] leading-[24px] text-dark-100"
      >
        Didn't receive a confirmation message?
      </Link>
      <span className="pt-[18px] pb-[12px] text-[16px] leading-[24px] text-light-100 font-normal">
        Do you have an account?
      </span>
      <Link href={'/login'} className="font-semibold text-[16px] leading-[24px] text-accent-500">
        Sing In
      </Link>
    </FormLayout>
  )
}
