import React, { FC, memo } from 'react'

import Head from 'next/head'
import { LoginPage } from '@/modules'

interface ILogin {}

const PageLogin: FC<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </div>
  )
})

export default PageLogin
