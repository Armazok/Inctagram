import React, { ChangeEvent, FC, useState } from 'react'

import { useRouter } from 'next/router'

import { CreatePostModal } from '@/components/modals/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'

interface IAddFullPost {
  openModal: string
  isModalOpen: boolean
  onCloseClick: () => void
  url: string
  filteredImage: string | File | null
  uploadId: string
  description: string
}

export const AddFullPost: FC<IAddFullPost> = ({
  openModal,
  isModalOpen,
  onCloseClick,
  url = '',
  uploadId,
  description = '',
}) => {
  const { mutate: addAllPostMutate } = useAddAllPostMutation()
  const [text, setText] = useState<string>(description)
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
      {openModal === 'publication' && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={onCloseClick}
          title={'Publication'}
          onBtnClick={addAllPost}
          variant={false}
        >
          <AddPublication imageUrl={url} text={text} setText={setText} />
        </CreatePostModal>
      )}
    </>
  )
}
