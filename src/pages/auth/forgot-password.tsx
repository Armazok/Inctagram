import React from 'react'

import { NextPage } from 'next'


import Link from '@/components/link/Link'


const ForgotPassword: NextPage = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <Link
        href={'/auth/sing-in'}
        title={'Back to Sign In'}
        // className={style.link}
      />
    </div>
  )
}

export default ForgotPassword
