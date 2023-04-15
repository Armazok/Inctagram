import React from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout'
import { RegisterPage } from '@/modules/auth-modules/registraion-module'
import { NextPageWithLayout } from '@/pages/_app'

const PageRegistration: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Registered</title>
      </Head>
      <RegisterPage />
    </div>
  )
}

PageRegistration.getLayout = getLayoutWithHeader
export default PageRegistration
