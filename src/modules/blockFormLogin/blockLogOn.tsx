import React, { FC, memo } from 'react'

import FacebookSVG from '@/assets/icons/facebook-svgrepo.png'
import GoogleSVG from '@/assets/icons/google-svgrepo.png'
import { LogOn } from '@/components/atoms/logOnByUsing/logOn'

interface IBlockLogOn {}

export const BlockLogOn: FC<IBlockLogOn> = memo(({}) => {
  return (
    <div className={'flex justify-around w-2/5'}>
      <LogOn height={'36px'} width={'36px'} urlImg={GoogleSVG} className={'mt-3.5'} />
      <LogOn height={'36px'} width={'36px'} urlImg={FacebookSVG} className={'mt-3.5'} />
    </div>
  )
})
