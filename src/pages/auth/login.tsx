import React, { FC, memo } from 'react'

import Head from 'next/head'

import FormLayout from '@/components/FormLayout/FormLayout'
import { BlockLogOn, BlockNameTitle, BlockLoginForm, BlockLink } from '@/modules/blockFormLogin/'
interface ILogin {}

const Login: FC<ILogin> = memo(({}) => {
  return (
    <FormLayout className="mt-[60px]">
      <Head>
        <title>Login</title>
      </Head>
      <BlockNameTitle />
      <BlockLogOn />
      <BlockLoginForm />
      <BlockLink />
    </FormLayout>
  )
})

export default Login
