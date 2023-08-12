import React, { FC, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { useStoreIsLoadingPublication } from '@/modules/post-modules/create-post-module'
import { LatestPost } from '@/modules/post-modules/latest-posts/components/LatestPost'
import { PostModal } from '@/modules/post-modules/latest-posts/components/PostModal'
import { useGetLatestPosts } from '@/modules/post-modules/latest-posts/hooks/useGetLatestPosts'
import { useMeQuery } from '@/services/hookMe'
import { useUserStore } from '@/store'
import { SkeletonPost } from '@/ui'

export const LatestPosts: FC = () => {
  const { data: me } = useMeQuery()
  const { setPostId } = useUserStore()
  const userId = me?.data?.userId
  const { isLoading, isSuccess, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetLatestPosts(userId)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const skeletonIsPublication = useStoreIsLoadingPublication(state => state.isLoadingPublication)

  const usedToDrawArraysOfSkeletons = (value: number) => {
    return [...Array(value).keys()].map(i => {
      return <SkeletonPost key={i} />
    })
  }
  const onClose = () => {
    setIsOpenPostModal(false)
  }
  const onPostClick = (id: number) => {
    setPostId(id)
    setIsOpenPostModal(true)
  }

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <div className="mt-14">
      <div className="grid grid-cols-4 gap-3">
        {skeletonIsPublication && <SkeletonPost />}
        {isLoading
          ? usedToDrawArraysOfSkeletons(32)
          : data?.pages.map((page, idx) => (
              <React.Fragment key={idx}>
                {page &&
                  page.items.map(post => (
                    <LatestPost key={post.id} post={post} onPostClick={onPostClick} />
                  ))}
              </React.Fragment>
            ))}
      </div>

      {isSuccess && (
        <div className="pt-4" ref={ref}>
          {isFetchingNextPage && (
            <div className={'grid grid-cols-4 gap-3'}>{usedToDrawArraysOfSkeletons(12)}</div>
          )}
        </div>
      )}
      <PostModal isOpen={isOpenPostModal} onClose={onClose} />
    </div>
  )
}
