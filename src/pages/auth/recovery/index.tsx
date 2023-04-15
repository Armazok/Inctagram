import React from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout'
import { RecoveryPage } from '@/modules/auth-modules/password-recovery-module'
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
