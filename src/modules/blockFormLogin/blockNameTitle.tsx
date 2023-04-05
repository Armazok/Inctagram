import React, { FC, memo } from 'react'

import { NameTitle } from '@/components/atoms/title/nameTitle'

interface IBlockNameTitle {}

export const BlockNameTitle: FC<IBlockNameTitle> = memo(({}) => {
  return (
    <>
      <NameTitle nameTitle={'Sign In'} className={'font-bold text-light-100 mt-6'} />
    </>
  )
})
