import React from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { RecoveryPage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const PageRecovery: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Password recovery</title>
      </Head>
      <RecoveryPage />
    </div>
  )
}

PageRecovery.getLayout = getLayoutWithHeader
export default PageRecovery
