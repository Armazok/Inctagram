import React, { FC } from 'react'

import { clearDatabase } from '@/common/utils/indexedDb/clearDatabase'
import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { useUploadPost } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { usePostStore, useUserStore } from '@/store'
import { useImageSelector } from '@/store/storeSelectorPhoto'
import { Preloader } from '@/ui'

interface IAddFullPost {
  isModalOpen: boolean
  useStoreAddFullPostModule: (isModalOpen: any) => void
  callback?: () => void
  filterEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  useStoreAddFullPostModule,
  filterEditorModule,
  onClose,
  setIsDraftModalOpen,
}) => {
  const { postPhotos, clearPostPhotos, postDescription, isLoadedFromDB } = usePostStore()
  const { userId } = useUserStore()
  const { imagesSelector } = useImageSelector()

  const onSuccessPostSent = () => {
    if (isLoadedFromDB) {
      clearDatabase({
        dbName: IMAGES.DB_NAME,
        storeName: IMAGES.STORE_NAME,
        keyPath: IMAGES.KEY_PATH,
      })
    }
    clearPostPhotos()
    onClose()
    useStoreAddFullPostModule(false)
  }

  const { mutate: addPhotoToThePost, isLoading } = useUploadPost(onSuccessPostSent, userId!)
  const onCloseClick = () => {
    setIsDraftModalOpen(true)
    onClose()
    useStoreAddFullPostModule(false)
  }

  const onBackClick = () => {
    filterEditorModule(true)
    useStoreAddFullPostModule(false)
  }

  const addAllPost = async () => {
    const formData = new FormData()

    for (const photo of postPhotos) {
      // formData.append, чтобы добавить каждое изображение в форму данных,
      // используя параметры files, photo.selectedPhotos as File и photo.uploadId.
      // Метод formData.append автоматически создаст правильный объект Request,
      // содержащий файл, который можно передать в addPhotoToThePost.
      formData.append('files', photo.selectedPhotos as File, photo.uploadId)
    }

    formData.append('description', postDescription)

    addPhotoToThePost(formData)
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
        showBackArrow={true}
        variant={'Publish'}
      >
        {/*<AddPublication location={true} imageUrl={imageUrl} />*/}
      </CreatePostModal>
    </>
  )
}
