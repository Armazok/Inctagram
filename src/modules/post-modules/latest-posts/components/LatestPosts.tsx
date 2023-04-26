import React, { FC, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

import { PostModal } from '@/modules/post-modules/latest-posts/components/PostModal'
import { useGetInfiniteLatestPosts } from '@/modules/post-modules/latest-posts/hooks/useGetInfiniteLatestPosts'
import { useMeQuery } from '@/services/hookMe'

export const LatestPosts: FC = () => {
  const { data: me } = useMeQuery()
  const [idPost, setIdPost] = useState<number | null>(null)

  const userId = me?.data?.userId
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetInfiniteLatestPosts(userId)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const onClose = () => {
    setIsOpenPostModal(false)
  }

  const onPostClick = (idPost: number) => {
    setIdPost(idPost)
    setIsOpenPostModal(true)
  }

  const client = useQueryClient()

  return (
    <div className="mt-14">
      <button className="text-white" onClick={() => client.invalidateQueries(['posts'])}>
        reset
      </button>

      <div className="grid grid-cols-4 gap-3 mt-14">
        {data?.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page &&
              page.items.map(photo => (
                <div
                  className="aspect-square relative"
                  key={photo.id}
                  onClick={() => onPostClick(photo.id)}
                >
                  <Image
                    src={photo.images[0]?.url}
                    width={photo.images[0]?.width}
                    height={photo.images[0]?.height}
                    alt=""
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>

      <button className="text-white" onClick={() => fetchNextPage()}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load Newer'
          : 'Nothing more to load'}
      </button>

      <PostModal isOpen={isOpenPostModal} onClose={onClose} photoId={idPost} />
    </div>
  )
}
