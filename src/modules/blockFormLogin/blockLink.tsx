import React, { FC, memo } from 'react'

import Link from '@/components/atoms/link/Link'

interface IBlockLink {}

export const BlockLink: FC<IBlockLink> = memo(({}) => {
  return (
    <>
      <Link href={'/'} title={'Dont`t have an account?'} className={'text-danger-300'} />
      <Link href={'/'} title={'Sign Up'} className={'text-blue-600'} />
    </>
  )
})
