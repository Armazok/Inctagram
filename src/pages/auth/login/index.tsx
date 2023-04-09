import React, { FC, memo } from 'react'

import Head from 'next/head'

import { LoginPage } from '@/modules/auth-modules/login-module/login/LoginPage'

interface ILogin {}

export const PageLogin: FC<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>Login</Head>
      <LoginPage />
    </div>
  )
})
