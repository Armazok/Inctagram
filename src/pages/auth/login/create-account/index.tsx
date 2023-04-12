import React, { FC } from 'react'

import Head from 'next/head'

import CreateAccount from '@/modules/create-account-modules/components/create-account'

interface IIndex {}

const index: FC<IIndex> = ({}) => {
  return (
    <div className="container flex flex-col items-center w-full max-w-md text-center mt-[245px]">
      <Head>
        <title>Create Account</title>
      </Head>
      <CreateAccount />
    </div>
  )
}

export default index
