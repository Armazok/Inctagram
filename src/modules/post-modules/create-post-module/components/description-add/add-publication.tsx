import React, { FC } from 'react'

import { RightDescription } from '@/modules/post-modules/create-post-module/components/description-add/rightDescription'

type AddPublicationType = {
  imageUrl: string
  text: string
  setText: (newText: string) => void
}

export const AddPublication: FC<AddPublicationType> = ({ imageUrl = '', text = '', setText }) => {
  return (
    <div className={'flex flex-wrap'}>
      <div className={'w-[436px]'}>
        <img
          src={imageUrl}
          alt="photo"
          style={{
            width: '434px',
          }}
          id={'image-publication'}
        />
      </div>
      <RightDescription text={text} setText={setText} />
    </div>
  )
}
