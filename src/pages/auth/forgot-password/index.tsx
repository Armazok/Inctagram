import React from 'react'
import Head from 'next/head'
import {ForgotPasswordPage} from '@/modules'

const PageForgotPassword = () => {
  return (
      <div>
          <Head>
              <title>Forgot password</title>
          </Head>
        <ForgotPasswordPage />
      </div>
  )
}

export default PageForgotPassword
