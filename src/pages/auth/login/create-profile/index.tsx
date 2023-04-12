import React, { FC } from 'react'

import Head from 'next/head'

import CreateProfile from '@/modules/create-profile-modules/components/create-profile'

interface IIndex {}

const index: FC<IIndex> = ({}) => {
  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <CreateProfile />
    </div>
  )
}

export default index
