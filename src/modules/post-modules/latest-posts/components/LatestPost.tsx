import React, { FC } from 'react'

import Image from 'next/image'

import { Post } from '@/modules/post-modules/latest-posts/api/latest-posts-api'

interface Props {
  photo: Post
  onPostClick: (id: number) => void
}

export const LatestPost: FC<Props> = ({ photo, onPostClick }) => {
  return (
    <div className="aspect-square relative" key={photo.id} onClick={() => onPostClick(photo.id)}>
      <Image
        src={photo.images[0]?.url}
        width={photo.images[0]?.width}
        height={photo.images[0]?.height}
        alt=""
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  )
}
