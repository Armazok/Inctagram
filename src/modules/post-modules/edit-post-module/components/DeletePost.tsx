import React from 'react'

import { Confirm } from '@/components/modals'
import { useDeletePostMutation } from '@/modules/post-modules/edit-post-module/hooks/useDeletePost'
import { Preloader } from '@/ui'

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

  //change this part to variable from store later, like this // const { userId } = useUserStore()
  //@ts-ignore
  const userId = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).userId

  const { isLoading, mutate: deletePost } = useDeletePostMutation(onSuccess, userId)

  const onDeleteModalCloseClick = () => {
    setIsDeleteModalOpen(false)
  }

  const onConfirmDeleteModalClick = () => {
    if (postId) {
      deletePost(postId)
    }
  }

  if (isLoading) return <Preloader />

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
