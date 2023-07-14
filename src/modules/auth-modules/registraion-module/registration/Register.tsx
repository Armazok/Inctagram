import React from 'react'

import Link from 'next/link'

import { PATH_ROUTE } from '@/common/constants/PATH_ROUTE'
import { FormLayout } from '@/components/FormLayout'
import {
  GoogleGithubRegistration,
  RegistrationForm,
} from '@/modules/auth-modules/registraion-module'
import { NameTitle } from '@/ui'

export const Register = () => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle="Sing Up"
        className="font-bold text-light-100 text-[20px] leading-[36px] mb-[12px]"
      />
      <GoogleGithubRegistration />
      <RegistrationForm />
      <Link
        href={PATH_ROUTE.RESEND_FORM}
        className="font-semibold text-[16px] leading-[24px] text-dark-100"
      >
        Didn&apos;t receive a confirmation message?
      </Link>
      <span className="pt-[18px] pb-[12px] text-[16px] leading-[24px] text-light-100 font-normal">
        Do you have an account?
      </span>
      <Link
        href={PATH_ROUTE.LOGIN}
        className="font-semibold text-[16px] leading-[24px] text-accent-500"
      >
        Sing In
      </Link>
    </FormLayout>
  )
}
