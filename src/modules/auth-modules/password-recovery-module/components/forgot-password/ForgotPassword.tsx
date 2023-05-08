import React from 'react'

import { NextPage } from 'next'

import { FormLayout } from '@/components/FormLayout'
import { ForgotPasswordWithCaptcha } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/ForgotPasswordWithCaptcha'
import { NameTitle } from '@/ui'
import Link from '@/ui/link/Link'

export const ForgotPassword: NextPage = () => {
  return (
    <FormLayout className="mt-[60px]">
      <NameTitle nameTitle={'Forgot Password'} className={'text-light-100 mt-6'} />
      <ForgotPasswordWithCaptcha />
      <Link
        href={'/auth/login'}
        title={'Back to Sign In'}
        className={'font-semibold text-[16px] leading-[24px] text-accent-500 mt-2 mb-4'}
      />
    </FormLayout>
  )
}
