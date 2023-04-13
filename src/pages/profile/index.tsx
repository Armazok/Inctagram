import React from 'react'

import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout/GlobalLayout/GlobalLayout'
import { Private } from '@/components/privateRoute/privatRoute'
import { ProfilePage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'
import { useUserStore } from '@/store'

const index: NextPageWithLayout = () => {
  const { accessToken } = useUserStore()

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      {/*<Private accessToken={accessToken}>*/}
      <ProfilePage />
      {/*</Private>*/}
    </div>
  )
}

index.getLayout = getGlobalLayout
export default index
