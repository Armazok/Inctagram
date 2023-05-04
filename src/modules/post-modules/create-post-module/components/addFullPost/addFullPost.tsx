import React, { FC } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useUploadPost } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { clearDatabase } from '@/modules/post-modules/create-post-module/utils/clearDatabase'
import { usePostStore } from '@/store'

interface IAddFullPost {
  isModalOpen: boolean
  useStoreAddFullPostModule: (isModalOpen: any) => void
  callback?: () => void
  filterEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  useStoreAddFullPostModule,
  filterEditorModule,
  onClose,
}) => {
  // const { descriptionLocal } = useUserStore()
  const { postPhotos, clearPostPhotos } = usePostStore()
  const imageId = 0
  const { filteredPhoto, selectedPhoto, croppedPhoto } = postPhotos[imageId]
  let imageUrl = ''

  if (filteredPhoto) {
    imageUrl = filteredPhoto
  } else if (croppedPhoto) {
    imageUrl = croppedPhoto
  } else if (selectedPhoto) {
    imageUrl = selectedPhoto
  }

  const onSuccessPostSent = () => {
    clearPostPhotos()
    clearDatabase()
    useStoreAddFullPostModule(false)
  }

  const { mutate: addPhotoToThePost } = useUploadPost(onSuccessPostSent)

  // const { mutate: addAllPostMutate } = useAddAllPostMutation()
  const onCloseClick = () => {
    onClose()
    useStoreAddFullPostModule(false)
  }

  const onBackClick = () => {
    filterEditorModule(true)
    useStoreAddFullPostModule(false)
  }

  const addAllPost = async () => {
    const formData = new FormData()

    const blobUrl = imageUrl as RequestInfo | URL

    fetch(blobUrl)
      .then(response => response.blob())
      .then((blob: Blob) => {
        formData.append('file', blob, 'image.png')
        addPhotoToThePost(formData)
      })
    // if (uploadId && descriptionLocal) {
    //     addAllPostMutate({
    //         description: descriptionLocal,
    //         childrenMetadata: [{uploadId}],
    //     })
    // } else {
    //   console.log('Bad Function Bad')
    //   useStoreAddFullPostModule(false)
    // }
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
        <AddPublication location={true} imageUrl={imageUrl} />
      </CreatePostModal>
    </>
  )
}
