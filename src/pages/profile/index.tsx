import React from 'react'

import Head from 'next/head'

import { ProfilePage } from '@/modules'

const PageProfile = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </div>
  )
}

export default PageProfile
