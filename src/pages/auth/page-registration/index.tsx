import React from 'react'
import Head from 'next/head'
import { RegisterPage } from '@/modules'

const PageRegistration = () => {
  return (
    <div>
      <Head>
        <title>Registered</title>
      </Head>
      <RegisterPage />
    </div>
  )
}

export default PageRegistration
