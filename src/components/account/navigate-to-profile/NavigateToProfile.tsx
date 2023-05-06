import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import arrowLeft from '../../../assets/icons/arrow-left.png'

export const NavigateToProfile = () => {
  const { replace } = useRouter()

  return (
    <div className="flex mb-4 items-center">
      <Image
        src={arrowLeft}
        alt="arrow left"
        height={24}
        width={24}
        priority={true}
        className="cursor-pointer"
        onClick={() => replace('/profile', undefined, { shallow: true })}
      />
      <p className="text-base text-light-100 font-bold text-center w-full ">Profile Settings</p>
    </div>
  )
}
