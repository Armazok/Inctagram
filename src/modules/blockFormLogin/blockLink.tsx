import React, { FC, memo } from 'react'

import Link from 'next/link'

interface IBlockLink {}

export const BlockLink: FC<IBlockLink> = memo(({}) => {
  return (
    <>
      <span className="pb-[12px] text-[16px] leading-[24px] text-light-100 font-normal">
        Don`t have account?
      </span>
      <Link
        href={'/registration'}
        className="font-semibold text-[16px] leading-[24px] text-accent-500"
      >
        Sing Up
      </Link>
    </>
  )
})
