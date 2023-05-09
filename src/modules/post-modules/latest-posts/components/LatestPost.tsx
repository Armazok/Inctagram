import React, { FC } from 'react'

import Image from 'next/image'

import { Post } from '@/modules/post-modules/latest-posts/api/latest-posts-api'

interface Props {
  post: Post
  onPostClick: (id: number) => void
}

export const LatestPost: FC<Props> = ({ post, onPostClick }) => {
  return (
    <div className="aspect-square relative" key={post.id} onClick={() => onPostClick(post.id)}>
      <Image
        src={post.images[0].versions.large.url}
        width={post.images[0].versions.large.width}
        height={post.images[0].versions.large.height}
        alt=""
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  )
}
