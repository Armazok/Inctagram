import { FC, useState } from 'react'

import Image from 'next/image'

import { PostModal } from '@/modules/post-modules/latest-posts/components/PostModal'
import { useGetLatestPosts } from '@/modules/post-modules/latest-posts/hooks/useGetLatestPosts'

export const LatestPosts: FC = () => {
  const { data: posts } = useGetLatestPosts()
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const onClose = () => {
    setIsOpenPostModal(false)
  }

  const onPostClick = () => {
    setIsOpenPostModal(true)
  }

  return (
    <div className="mt-14">
      <div className="grid grid-cols-4 gap-3 mt-14">
        {posts?.response?.results.map(photo => (
          <div key={photo.id} className="aspect-square">
            <Image
              src={photo.urls.regular}
              alt={photo.description ?? ''}
              width={photo.width}
              height={photo.height}
              className="w-full h-full object-cover bg-slate-200 cursor-pointer"
              onClick={onPostClick}
            />
          </div>
        ))}
      </div>

      <PostModal isOpen={isOpenPostModal} onClose={onClose} />
    </div>
  )
}
