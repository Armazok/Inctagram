import React from 'react'

import Head from 'next/head'

import ProfilePage from '@/modules/profile-modules/profile-module/profile/ProfilePage'

const index = () => {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfilePage />
    </div>
  )
}

export default index
