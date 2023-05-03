import React, { FC } from 'react'

import { RightDescription } from '@/modules/post-modules/create-post-module/components/description-add/rightDescription'

type AddPublicationType = {
  imageUrl: string
  location: boolean
  callback?: () => void
}

export const AddPublication: FC<AddPublicationType> = ({ imageUrl, location, callback }) => {
  return (
    <div className={'flex flex-wrap w-[972px] justify-between'}>
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
      <RightDescription location={location} callback={callback} />
    </div>
  )
}
