import React from 'react'

import Image from 'next/image'

import preloader from '../../assets/gif/loadingGrey.gif'

export const Preloader = () => {
  return (
    <div
      className={
        'flex flex-col items-center justify-center content-center h-screen w-screen fixed bg-dark-500   top-0 left-0 z-10'
      }
    >
      <Image width={100} height={100} src={preloader} alt={'preloader'} priority={true} />
    </div>
  )
}
