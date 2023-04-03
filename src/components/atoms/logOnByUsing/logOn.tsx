import React, { FC, memo } from 'react'

import { StaticImageData } from 'next/image'

interface ILogOn {
  urlImg: StaticImageData
  width: string
  height: string
  className: string
}

export const LogOn: FC<ILogOn> = memo(({ urlImg, height, width, className }) => {
  return (
    <div>
      <img width={width} height={height} src={urlImg.src} alt="/" className={className} />
    </div>
  )
})
