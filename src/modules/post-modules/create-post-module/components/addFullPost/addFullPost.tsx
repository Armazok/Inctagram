import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import { CreatePostModal } from '@/components/modals/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'
import { useUserStore } from '@/store'

interface IAddFullPost {
  isModalOpen: boolean
  onCloseClick: () => void
  imageUrl: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  onCloseClick,
  imageUrl,
  setOpenModal,
}) => {
  const { uploadId } = useUserStore()

  const [text, setText] = useState<string>('')

  const { mutate: addAllPostMutate } = useAddAllPostMutation(() => setOpenModal(false))

  const addAllPost = () => {
    if (uploadId && text) {
      addAllPostMutate({
        description: text,
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
        variant={false}
      >
        <AddPublication imageUrl={imageUrl} text={text} setText={setText} />
      </CreatePostModal>
    </>
  )
}
