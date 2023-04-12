import React from 'react'

import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout/GlobalLayout/GlobalLayout'
import { ProfilePage } from '@/modules'
import { NextPageWithLayout } from '@/pages/_app'

const PageProfile: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </div>
  )
}

PageProfile.getLayout = getGlobalLayout
export default PageProfile
