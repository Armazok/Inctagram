import React from 'react'
import Image from 'next/image'
import placeholder from '@/assets/images/img-placeholder.png'

type PropsType = {
  src?: string
  alt: string
  height?: number
  width?: number
}
export const Avatar = ({ src, alt, height = 192, width = 192 }: PropsType) => {
  return (
    <Image
      src={src ? src : placeholder}
      alt={alt}
      className={`rounded-full`}
      width={width}
      height={height}
    />
  )
}
