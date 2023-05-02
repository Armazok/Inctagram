import React, { FC } from 'react'

import Image from 'next/image'

import preloader from '@/assets/gif/loadingGrey.gif'

export const LatestPostsLoader: FC = () => {
  return (
    <div className="flex justify-center">
      <Image width={50} height={50} src={preloader} alt="preloader" />
    </div>
  )
}
