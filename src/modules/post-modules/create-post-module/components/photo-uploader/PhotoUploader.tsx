import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { countData } from '@/common/utils/indexedDb/countData'
import { ModalWithContent } from '@/components/modals'
import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { getItemFromDatabase } from '@/modules/post-modules/create-post-module/utils/getImageFromDatabase'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { usePostStore } from '@/store'
import { GlobalButton } from '@/ui'

type PropsType = {}
export const PhotoUploader = ({}: PropsType) => {
  const [imageDbCount, setImageDbCount] = useState(0)

  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const cropEditorModal = useStoreCropEditorModal()
  const { setPhotoFromDB, clearPostPhotos } = usePostStore()

  const { replace, pathname } = useRouter()

  const onSetSelectedPhotoClick = (file: any) => {
    // setSelectedPhoto(file)
    // setUploadId()
  }
  const onSuccessOpenDraft = async (data: any) => {
    let filteredPhoto = URL.createObjectURL(data.filteredPhoto)
    let croppedPhoto = URL.createObjectURL(data.croppedPhoto)
    let selectedPhotos: string = ''

    if (data.selectedPhotos instanceof Blob || data.selectedPhotos instanceof File) {
      selectedPhotos = URL.createObjectURL(data.selectedPhotos)
    }

    const { uploadId, description, cropSize } = data

    await setPhotoFromDB(
      uploadId,
      croppedPhoto,
      filteredPhoto,
      description,
      cropSize,
      selectedPhotos
    )
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
    replace(pathname)
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
          maxImageSize={5}
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
