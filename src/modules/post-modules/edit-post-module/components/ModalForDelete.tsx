import React, { useState } from 'react'

import { Confirm } from '@/components/modals'
import { useDeletePostMutation } from '@/modules/post-modules/edit-post-module/hooks/useDeletePost'
import { Preloader } from '@/ui'

export const DeleteModal = () => {
  const mockPostId = 1

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(true)
  const { isLoading, mutate: deletePost } = useDeletePostMutation()

  const onDeleteModalCloseClick = () => {
    setIsDeleteModalOpen(false)
  }

  const onDeletePostClick = () => {
    setIsDeleteModalOpen(true)
  }

  const onConfirmDeleteModalClick = () => {
    deletePost(mockPostId)
    setIsDeleteModalOpen(false)
  }

  if (isLoading) return <Preloader />

  return (
    <>
      <button onClick={onDeletePostClick}>🗑</button>
      <Confirm
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalCloseClick}
        onConfirm={onConfirmDeleteModalClick}
        title={'Delete post'}
        confirmButtonText={'Yes'}
        declineButtonText={'No'}
        text={'Are you sure you want to delete this post?'}
      />
    </>
  )
}
