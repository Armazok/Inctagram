import React from 'react'

import { Confirm } from '@/components/modals'
import { useDeletePost } from '@/modules/post-modules/edit-post-module/hooks/useDeletePost'
import { useUserStore } from '@/store'

type PropsType = {
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void
  postId: number | null
  onPostModalClose: (isOpen: boolean) => void
}

export const DeletePost = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  postId,
  onPostModalClose,
}: PropsType) => {
  const onSuccess = () => {
    setIsDeleteModalOpen(false)
    onPostModalClose(false)
  }

  const { userId } = useUserStore()

  // const userId = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).userId

  const { isLoading, mutate: deletePost } = useDeletePost(onSuccess, userId as number)

  const onDeleteModalCloseClick = () => {
    setIsDeleteModalOpen(false)
  }

  const onConfirmDeleteModalClick = () => {
    if (postId) {
      deletePost(postId)
    }
  }

  return (
    <>
      <Confirm
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalCloseClick}
        onConfirm={onConfirmDeleteModalClick}
        title={'Delete post'}
        confirmButtonText={'Yes'}
        declineButtonText={'No'}
        text={'Are you sure you want to delete this post?'}
        disabled={isLoading}
      />
    </>
  )
}
