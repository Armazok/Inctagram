import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { countData } from '@/common/utils/indexedDb/countData'
import { ModalWithContent } from '@/components/modals'
import { modalType } from '@/modules/post-modules/create-post-module'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { getItemFromDatabase } from '@/modules/post-modules/create-post-module/utils/getImageFromDatabase'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'
import { GlobalButton } from '@/ui'

type PropsType = modalType

export const PhotoUploader: React.FC<PropsType> = ({ isModalOpen, onClose, setModal }) => {
  const [imageDbCount, setImageDbCount] = useState(0)

  const { replace, pathname } = useRouter()

  const { setImageSelector, setDescription } = useImageSelector()

  const onSuccessOpenDraft = async (data: any) => {
    let { photoArray, description } = data

    photoArray.map((photo: IPhoto) => {
      // @ts-ignore
      photo.filteredUrl = URL.createObjectURL(photo.filteredUrl)
      // @ts-ignore
      photo.finalUrl = URL.createObjectURL(photo.finalUrl)
      // @ts-ignore
      photo.url = URL.createObjectURL(photo.url)
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
    setModal('add-full-post')
  }

  const onCloseClick = () => {
    onClose()
    replace(pathname)
  }

  const checkCountDB = async () => {
    const count = await countData(IMAGES.DB_NAME, IMAGES.STORE_NAME)

    setImageDbCount(count)
  }

  useEffect(() => {
    checkCountDB()
  }, [isModalOpen])

  return (
    <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add photo'}>
      <>
        <PhotoSelector isModalOpen={isModalOpen} setModal={setModal} maxImageSize={5} />
        {imageDbCount > 0 && (
          <GlobalButton type={'button'} callback={onOpenDraftClick}>
            Open draft
          </GlobalButton>
        )}
      </>
    </ModalWithContent>
  )
}
