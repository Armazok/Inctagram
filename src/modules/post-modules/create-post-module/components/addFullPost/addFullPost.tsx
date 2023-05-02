import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'
import { useUserStore } from '@/store'

interface IAddFullPost {
  isModalOpen: boolean
  imageUrl: string
  useStoreAddFullPostModule: (isModalOpen: any) => void
  callback?: () => void
  filterEditorModule: (isModalOpen: boolean) => void
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  imageUrl,
  callback,
  useStoreAddFullPostModule,
  filterEditorModule,
}) => {
  const { uploadId } = useUserStore()

  const [text, setText] = useState<string>('')

  const { mutate: addAllPostMutate } = useAddAllPostMutation()
  const onCloseClick = () => {
    useStoreAddFullPostModule(false)
  }

  const onBackClick = () => {
    filterEditorModule(true)
    useStoreAddFullPostModule(false)
  }

  const addAllPost = () => {
    if (uploadId && text) {
      addAllPostMutate({
        description: text,
        childrenMetadata: [{ uploadId }],
      })
    } else {
      console.log('Bad Function Bad')
      useStoreAddFullPostModule(false)
    }
  }

  return (
    <>
      <CreatePostModal
        isOpen={isModalOpen}
        onBackClick={onBackClick}
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
