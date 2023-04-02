import React from 'react'

import { NextPage } from 'next'

import Link from '@/components/link/Link'
import style from '@/pages/auth/register.module.scss'
import containerBlock from '@/styles/container.module.scss'

const ForgotPassword: NextPage = () => {
  return (
    <div className={`${containerBlock.container} ${style.registerBlock}`}>
      <h2>Forgot Password</h2>
      <Link href={'/auth/sing-in'} title={'Back to Sign In'} className={style.desciptionSignIn} />
    </div>
  )
}

export default ForgotPassword
