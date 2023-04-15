import React from 'react'

import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout'
import { ProfilePage } from '@/modules/profile-modules/profile-module'
import { NextPageWithLayout } from '@/pages/_app'

const index: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </div>
  )
}

index.getLayout = getGlobalLayout
export default index
