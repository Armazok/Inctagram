import React, { FC, useState } from 'react'

import Image from 'next/image'

import { PostModal } from '@/modules/post-modules/latest-posts/components/PostModal'
import { useGetLatestPosts } from '@/modules/post-modules/latest-posts/hooks/useGetLatestPosts'
import { useMeQuery } from '@/services/hookMe'
import { useUserStore } from '@/store'

export const LatestPosts: FC = () => {
  const { data: me } = useMeQuery()
  const { setPostId } = useUserStore()
  const userId = me?.data?.userId
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetLatestPosts(userId)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const onClose = () => {
    setIsOpenPostModal(false)
  }

  const onPostClick = (id: number) => {
    setPostId(id)
    setIsOpenPostModal(true)
  }

  return (
    <div className="mt-14">
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

      <PostModal isOpen={isOpenPostModal} onClose={onClose} />
    </div>
  )
}
