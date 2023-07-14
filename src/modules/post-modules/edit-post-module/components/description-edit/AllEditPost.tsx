import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { useEditPostMutation } from '@/modules/post-modules/create-post-module/hooks/useEditPost'
import { EditPublication } from '@/modules/post-modules/edit-post-module/components/description-edit/edit-publication'
import { useUserStore } from '@/store'

interface IEditPost {
  isModalOpen: boolean
  onCloseClick: () => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
  imageUrl: string
  description: string
}

export const EditPost: FC<IEditPost> = ({ isModalOpen, onCloseClick, imageUrl, description }) => {
  const { postId, userId } = useUserStore()
  const [text, setText] = useState<string>(description)

  const { mutate: editFunc } = useEditPostMutation(postId)

  const editPost = () => {
    if (postId) {
      editFunc({ postId: postId, description: text })
      onCloseClick()
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
        <EditPublication imageUrl={imageUrl} callback={editPost} text={text} setText={setText} />
      </CreatePostModal>
    </div>
  )
}
