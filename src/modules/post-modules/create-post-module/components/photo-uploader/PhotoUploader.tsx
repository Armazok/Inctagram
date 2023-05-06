import React, { useEffect, useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
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
  const [imageDbCount, setImageDbCount] = useState(0)

  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const cropEditorModal = useStoreCropEditorModal()
  const { setPhotoFromDB, clearPostPhotos, setUploadId } = usePostStore()

  const onSetSelectedPhotoClick = (file: any) => {
    setSelectedPhoto(file)
    setUploadId()
  }
  const onSuccessOpenDraft = async (data: any) => {
    let blobUrl = URL.createObjectURL(data.filteredPhoto)
    let id = data.uploadId

    await setPhotoFromDB(blobUrl, id)
    useStoreAddFullPostModal.setIsModalOpen(true)
  }
  const onOpenDraftClick = async () => {
    clearPostPhotos()

    await getItemFromDatabase({
      onSuccess: onSuccessOpenDraft,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
      dbName: IMAGES.DB_NAME,
    })
    modalWithContent.setIsModalOpen(false)
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
  }, [modalWithContent.isModalOpen])

  return (
    <ModalWithContent
      isOpen={modalWithContent.isModalOpen}
      onClose={onCloseClick}
      title={'Add photo'}
    >
      <>
        <PhotoSelector
          cropEditorModule={cropEditorModal.setIsModalOpen}
          modalWithContent={modalWithContent.setIsModalOpen}
          setSelectedPhoto={onSetSelectedPhotoClick}
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
