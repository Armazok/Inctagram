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
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'
import { GlobalButton } from '@/ui'

type PropsType = {}
export const PhotoUploader = ({}: PropsType) => {
  const [imageDbCount, setImageDbCount] = useState(0)

  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const cropEditorModal = useStoreCropEditorModal()

  const { replace, pathname } = useRouter()

  const { setImageSelector, setDescription } = useImageSelector()

  const onSuccessOpenDraft = async (data: any) => {
    let { photoArray, description } = data

    photoArray.map((photo: IPhoto) => {
      // @ts-ignore
      photo.filteredUrl = URL.createObjectURL(photo.filteredUrl)
      // @ts-ignore
      photo.finalUrl = URL.createObjectURL(photo.finalUrl)
    })
    setImageSelector(photoArray)
    setDescription(description)
  }
  const onOpenDraftClick = async () => {
    setImageSelector([])
    await getItemFromDatabase({
      onSuccess: onSuccessOpenDraft,
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
      dbName: IMAGES.DB_NAME,
    })
    modalWithContent.setIsModalOpen(false)
    useStoreAddFullPostModal.setIsModalOpen(true)
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
