import React, { memo } from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { LoginPage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

interface ILogin {}

const index: NextPageWithLayout<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>
        <title>Login</title>
        <LoginPage />
      </Head>
    </div>
  )
})

index.getLayout = getLayoutWithHeader
export default index
