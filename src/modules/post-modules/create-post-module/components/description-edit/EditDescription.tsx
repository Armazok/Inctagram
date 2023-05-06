import React, { FC, memo } from 'react'

import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'

interface IEditDescription {
  imageUrl: string
  location: boolean
  callback: () => void
}

export const EditDescription: FC<IEditDescription> = memo(({ imageUrl, location, callback }) => {
  return <AddPublication imageUrl={imageUrl} location={location} callback={callback} />
})
