import { FC, useState } from 'react'

import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'

import { Confirm } from '@/components/modals'
import { PostImage } from '@/modules/post-modules/latest-posts/api/latest-posts-api'
import { useDeletePostImage } from '@/modules/post-modules/latest-posts/hooks/useDeletePostImage'
import { useMeQuery } from '@/services/hookMe'

interface Props {
  postId: number
  image: PostImage
  description: string
  totalImagesCount: number
  ownerId: number
}

export const PostImagesSlide: FC<Props> = ({
  postId,
  image,
  description,
  totalImagesCount,
  ownerId,
}) => {
  const { mutate, isLoading } = useDeletePostImage(postId, image.uploadId)
  const { data: me } = useMeQuery()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const isCanDeleteImage = totalImagesCount > 1 && me?.data.userId === ownerId

  const onConfirmDelete = () => {
    mutate()
    setIsConfirmOpen(false)
  }

  const onDeclineDelete = () => {
    setIsConfirmOpen(false)
  }

  const onCloseConfirm = () => {
    setIsConfirmOpen(false)
  }

  return (
    <>
      <Image src={image.versions.huge.url} fill alt={description || ''} className="object-cover" />

      {isCanDeleteImage && (
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="text-white absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <FaTimes size={24} />
        </button>
      )}

      <Confirm
        isOpen={isConfirmOpen}
        onConfirm={onConfirmDelete}
        onDecline={onDeclineDelete}
        onClose={onCloseConfirm}
        title="Delete Photo"
        text="Are you sure you want to delete this photo?"
      />
    </>
  )
}
