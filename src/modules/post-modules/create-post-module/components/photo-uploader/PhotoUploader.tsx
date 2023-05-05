import React, { useEffect, useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import {
  useStoreAddPostModule,
  useStoreCropEditorModule,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { countData } from '@/modules/post-modules/create-post-module/utils/countData'
import { getItemFromDatabase } from '@/modules/post-modules/create-post-module/utils/getImageFromDatabase'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { usePostStore } from '@/store'
import { GlobalButton } from '@/ui'

type PropsType = {
  setSelectedPhoto: (photo: string | File | null) => void
}
export const PhotoUploader = ({ setSelectedPhoto }: PropsType) => {
  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModule = useStoreAddPostModule()
  const cropEditorModule = useStoreCropEditorModule()
  const { setPhotoFromDB, imageDbCount, setImageDbCount, clearPostPhotos } = usePostStore()

  const onSuccessOpenDraft = async (data: any) => {
    let blobUrl = URL.createObjectURL(data.filteredPhoto)
    let id = data.uploadId
    await setPhotoFromDB(blobUrl, id)
    useStoreAddFullPostModule.setIsModalOpen(true)
  }
  const onOpenDraftClick = async () => {
    clearPostPhotos()
    await getItemFromDatabase({
      onSuccess: onSuccessOpenDraft,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
      dbName: IMAGES.DB_NAME,
    })
  }

  const onCloseClick = () => {
    modalWithContent.setIsModalOpen(false)
  }

  const checkCountDB = async () => {
    const count = await countData(IMAGES.DB_NAME, IMAGES.STORE_NAME)
    setImageDbCount(count)
  }

  useEffect(() => {
    checkCountDB()
  }, [])

  return (
    <ModalWithContent
      isOpen={modalWithContent.isModalOpen}
      onClose={onCloseClick}
      title={'Add photo'}
    >
      <>
        <PhotoSelector
          cropEditorModule={cropEditorModule.setIsModalOpen}
          modalWithContent={modalWithContent.setIsModalOpen}
          setSelectedPhoto={setSelectedPhoto}
        />
        {imageDbCount > 0 && (
          <GlobalButton type={'button'} callback={onOpenDraftClick}>
            Open draft
          </GlobalButton>
        )}
      </>
    </ModalWithContent>
  )
}
