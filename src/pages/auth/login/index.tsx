import React, { memo } from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { LoginPage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

interface ILogin {}

const PageLogin: NextPageWithLayout<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </div>
  )
})

PageLogin.getLayout = getLayoutWithHeader
export default PageLogin
