import React, { FC, memo } from 'react'

import Head from 'next/head'

import { LoginPage } from '@/modules/auth-modules/login-module/login/LoginPage'

interface ILogin {}

const PageLogin: FC<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>Login</Head>
      <LoginPage />
    </div>
  )
})

export default PageLogin
