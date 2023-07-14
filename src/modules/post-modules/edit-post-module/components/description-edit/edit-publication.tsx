import React, { FC } from 'react'

import { RightDescription } from '@/modules/post-modules/create-post-module/components/description-add/rightDescription'
import { PostImagesSlider } from '@/modules/post-modules/latest-posts/components/PostImagesSlider'

type AddPublicationType = {
  imageUrl: string
  location?: boolean
  callback?: () => void
  text?: string
  setText?: (newText: string) => void
}

export const EditPublication: FC<AddPublicationType> = ({ imageUrl, callback, text, setText }) => {
  return (
    <div className={'flex flex-wrap w-[972px] justify-between min-h-[500px]'}>
      <div className={'w-[436px]'}>
        <PostImagesSlider showIconDelete={true} />
      </div>
      <RightDescription location={false} text={text} setText={setText} callback={callback} />
    </div>
  )
}
