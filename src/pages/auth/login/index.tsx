import React, { memo } from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { Login } from '@/modules/auth-modules/login-module'
import { NextPageWithLayout } from '@/pages/_app'

interface ILogin {}

const LoginPage: NextPageWithLayout<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </div>
  )
})

LoginPage.getLayout = getLayoutWithHeader
export default LoginPage
