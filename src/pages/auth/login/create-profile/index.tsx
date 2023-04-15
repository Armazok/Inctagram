import React from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { CreateProfile } from '@/modules/create-profile-modules'
import { NextPageWithLayout } from '@/pages/_app'

interface IIndex {}

const index: NextPageWithLayout<IIndex> = ({}) => {
  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <CreateProfile />
    </div>
  )
}

index.getLayout = getLayoutWithHeader
export default index
