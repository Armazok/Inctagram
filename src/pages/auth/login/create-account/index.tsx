import React from 'react'

import Head from 'next/head'

import CreateAccount from '@/components/account/create-account/create-account'
import { getLayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { NextPageWithLayout } from '@/pages/_app'

interface IIndex {}

const index: NextPageWithLayout<IIndex> = ({}) => {
  return (
    <div className="container flex flex-col items-center w-full max-w-md text-center mt-[245px]">
      <Head>
        <title>Create Account</title>
      </Head>
      <CreateAccount />
    </div>
  )
}

index.getLayout = getLayoutWithHeader
export default index
