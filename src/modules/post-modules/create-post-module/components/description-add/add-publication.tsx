import React, { FC } from 'react'

import { IPhoto } from '@/store/storeSelectorPhoto'

type AddPublicationType = {
  imageUrl: IPhoto
  location?: boolean
  callback?: () => void
  text?: string
  setText?: (newText: string) => void
}

export const AddPublication: FC<AddPublicationType> = ({ imageUrl }) => {
  return (
    <div className={'flex flex-wrap w-[972px] justify-between'}>
      <div className={'w-[436px]'}>
        <img
          src={String(imageUrl.finalUrl)}
          alt="photo"
          style={{
            width: '434px',
          }}
          id={'image-publication'}
        />
      </div>
    </div>
  )
}
