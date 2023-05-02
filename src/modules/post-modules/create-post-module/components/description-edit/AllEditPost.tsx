import React, { Dispatch, FC, SetStateAction } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { EditDescription } from '@/modules/post-modules/create-post-module/components/description-edit/EditDescription'
import { useEditPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useEditPost'
import { useUserStore } from '@/store'

interface IEditPost {
  isModalOpen: boolean
  onCloseClick: () => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
  imageUrl: string
  description: string
  location: boolean
}

export const AllEditPost: FC<IEditPost> = ({
  isModalOpen,
  onCloseClick,
  imageUrl,
  location,
  description,
}) => {
  const { postId, descriptionLocal } = useUserStore()

  const { mutate: editFunc } = useEditPostMutation()

  const editPost = () => {
    debugger
    if (postId && descriptionLocal) {
      editFunc({ postId: postId, description: descriptionLocal })
    } else {
      console.log('editPost BAD BAD')
    }
  }

  return (
    <div className={'flex flex-wrap'}>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={onCloseClick}
        title={'Edit post'}
        onBtnClick={() => ''}
        showBackArrow={false}
      >
        <EditDescription imageUrl={imageUrl} location={location} callback={editPost} />
      </CreatePostModal>
    </div>
  )
}
