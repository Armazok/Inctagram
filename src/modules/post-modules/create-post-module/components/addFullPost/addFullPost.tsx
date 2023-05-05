import React, { FC, useState } from 'react'

import UIkit from 'uikit'

import upload = UIkit.upload
import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'
import { useUploadPost } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { clearDatabase } from '@/modules/post-modules/create-post-module/utils/clearDatabase'
import { usePostStore, useUserStore } from '@/store'
import { Preloader } from '@/ui'

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
  const [description, setDescription] = useState('')

  const { postPhotos, clearPostPhotos, postDescription } = usePostStore()
  const { userId } = useUserStore()
  let imageUrl = postPhotos[0].filteredPhoto

  console.log(postPhotos, 'postPhotos')
  console.log(imageUrl, 'imageUrl')
  let isLoadedFromDB = postPhotos[0].isLoadedFromDB

  const onSuccessPostSent = () => {
    if (isLoadedFromDB) {
      clearDatabase({
        dbName: IMAGES.DB_NAME,
        storeName: IMAGES.STORE_NAME,
        keyPath: IMAGES.KEY_PATH,
      })
    }
    clearPostPhotos()
    useStoreAddFullPostModule(false)
  }

  const { mutate: addPhotoToThePost, isLoading } = useUploadPost(onSuccessPostSent, userId!)

  const { mutate: addAllPostMutate } = useAddAllPostMutation()
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
        formData.append('file', blob) // add file to Form data

        // formData.append('description', description) // add description to Form data
        //
        // const json = { description: description }
        // formData.append('json', JSON.stringify(json)) // add JSON object to Form data as text field

        // formData.append('file', blob, 'image.png')
        addPhotoToThePost(formData)
      })
    const uploadId = 'c794b16b-cfe8-42d3-b289-1e0853dd3f7f'

    if (uploadId && postDescription) {
      addAllPostMutate({
        description: postDescription,
        // @ts-ignore
        childrenMetadata: [{ uploadId }],
      })
      // } else {
      //   console.log('Bad Function Bad')
      //   useStoreAddFullPostModule(false)
    }
  }

  if (isLoading) return <Preloader />

  return (
    <>
      <CreatePostModal
        isOpen={isModalOpen}
        onBackClick={onBackClick}
        onClose={onCloseClick}
        title={'Publication'}
        onBtnClick={addAllPost}
        showBackArrow={!isLoadedFromDB}
        variant={'Publish'}
      >
        <AddPublication location={true} imageUrl={imageUrl} />
      </CreatePostModal>
    </>
  )
}
