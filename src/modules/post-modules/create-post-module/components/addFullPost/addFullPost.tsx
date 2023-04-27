import React, { Dispatch, FC, SetStateAction, useState } from 'react'

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
  const { uploadId } = useUserStore()

  const [text, setText] = useState<string>('')

  const { mutate: addAllPostMutate } = useAddAllPostMutation()

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
        showBackArrow={true}
        variant={'Publish'}
      >
        <AddPublication
          location={true}
          imageUrl={imageUrl}
          text={text}
          setText={setText}
          callback={callback}
        />
      </CreatePostModal>
    </>
  )
}
