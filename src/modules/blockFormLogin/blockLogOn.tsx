import React, { FC, memo } from 'react'

import FacebookSVG from '@/assets/icons/facebook-svgrepo.png'
import GoogleSVG from '@/assets/icons/google-svgrepo.png'
import { LogOn } from '@/components/atoms/logOnByUsing/logOn'
import GoogleFacebook from '@/ui/GoogleFacebook/GoogleFacebook'

interface IBlockLogOn {}

export const BlockLogOn: FC<IBlockLogOn> = memo(({}) => {
  return <GoogleFacebook />
})
