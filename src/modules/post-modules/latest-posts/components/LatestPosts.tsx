import React, { FC, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { useStoreIsLoadingPublication } from '@/modules/post-modules/create-post-module'
import { useUploadPost } from '@/modules/post-modules/create-post-module/hooks/useAddPostImgMutation'
import { LatestPost } from '@/modules/post-modules/latest-posts/components/LatestPost'
import { LatestPostsLoader } from '@/modules/post-modules/latest-posts/components/LatestPostsLoader'
import { PostModal } from '@/modules/post-modules/latest-posts/components/PostModal'
import { useGetLatestPosts } from '@/modules/post-modules/latest-posts/hooks/useGetLatestPosts'
import { useMeQuery } from '@/services/hookMe'
import { useUserStore } from '@/store'
import { SkeletonPost } from '@/ui/skeletons/SkeletonPost'

export const LatestPosts: FC = () => {
  const { data: me } = useMeQuery()
  const { setPostId } = useUserStore()
  const userId = me?.data?.userId
  const { isLoading, isSuccess, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetLatestPosts(userId)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const skeletonIsPublication = useStoreIsLoadingPublication(state => state.isLoadingPublication)

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
      {/*{true && <LatestPostsLoader />}*/}

      <div className="grid grid-cols-4 gap-3">
        {skeletonIsPublication && <SkeletonPost />}
        {isLoading
          ? [...Array(30).keys()].map(i => {
              return <SkeletonPost key={i} />
            })
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
          {isFetchingNextPage && <LatestPostsLoader />}
        </div>
      )}

      <PostModal isOpen={isOpenPostModal} onClose={onClose} />
    </div>
  )
}
