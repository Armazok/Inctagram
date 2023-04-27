import React from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { ForgotPassword } from '@/modules/auth-modules/password-recovery-module'
import { NextPageWithLayout } from '@/pages/_app'

const PageForgotPassword: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Forgot password</title>
      </Head>
      <ForgotPassword />
    </div>
  )
}

PageForgotPassword.getLayout = getLayoutWithHeader
export default PageForgotPassword
