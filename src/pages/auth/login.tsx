import React, { FC, memo } from 'react'

import { BlockLink, BlockLogOn, BlockNameTitle, BlockLoginForm } from '@/modules/blockFormLogin/'
interface ILogin {}

const Login: FC<ILogin> = memo(({}) => {
  const style = 'flex flex-col items-center justify-center content-center'
  const styleCont =
    'flex flex-col items-center content-center max-w-full border border-bgLogBorder w-4/12 bg-bgLog mt-24 mr-auto ml-auto mb-36'

  return (
    <div className={style}>
      <div className={styleCont}>
        <BlockNameTitle />
        <BlockLogOn />
        <BlockLoginForm />
        <BlockLink />
      </div>
    </div>
  )
})

export default Login
