import React, { FC, memo } from 'react'

import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'

interface IEditDescription {
  imageUrl: string
  text: string
  setText: (newText: string) => void
  location: boolean
  callback: () => void
}

export const EditDescription: FC<IEditDescription> = memo(
  ({ imageUrl, text, setText, location, callback }) => {
    return (
      <AddPublication
        imageUrl={imageUrl}
        text={text}
        setText={setText}
        location={location}
        callback={callback}
      />
    )
  }
)
