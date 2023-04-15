import React from 'react'

import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout/GlobalLayout/GlobalLayout'
import { ProfilePage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'
import { useUserStore } from '@/store'

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
