import React, { Dispatch, FC, SetStateAction } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'
import { useUserStore } from '@/store'

interface IAddFullPost {
  isModalOpen: boolean
  onCloseClick: () => void
  imageUrl: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
  callback?: () => void
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  onCloseClick,
  imageUrl,
  callback,
}) => {
  const { uploadId, descriptionLocal } = useUserStore()

  const { mutate: addAllPostMutate } = useAddAllPostMutation()

  const addAllPost = () => {
    if (uploadId && descriptionLocal) {
      addAllPostMutate({
        description: descriptionLocal,
        childrenMetadata: [{ uploadId }],
      })
    } else {
      console.log('Bad Function Bad')
    }
  }

  return (
    <>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={onCloseClick}
        title={'Publication'}
        onBtnClick={addAllPost}
        showBackArrow={true}
        variant={'Publish'}
      >
        <AddPublication location={true} imageUrl={imageUrl} />
      </CreatePostModal>
    </>
  )
}
