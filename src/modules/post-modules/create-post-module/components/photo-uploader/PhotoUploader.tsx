import React, { useEffect, useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import {
  useStoreAddPostModule,
  useStoreCropEditorModule,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { countData } from '@/modules/post-modules/create-post-module/utils/countData'
import { getImageFromDatabase } from '@/modules/post-modules/create-post-module/utils/getImageFromDatabase'
import {
  DB_NAME,
  STORE_NAME,
} from '@/modules/post-modules/create-post-module/utils/setItemToDatabase'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { usePostStore } from '@/store'
import { GlobalButton } from '@/ui'

type PropsType = {
  setSelectedPhoto: (photo: string | File | null) => void
}
export const PhotoUploader = ({ setSelectedPhoto }: PropsType) => {
  const [dbCount, setDbCount] = useState<number>(0)
  const modalWithContent = useStoreWithContentModal()
  const useStoreAddFullPostModule = useStoreAddPostModule()
  const cropEditorModule = useStoreCropEditorModule()
  const { setPhotoFromDB } = usePostStore()

  const onOpenDraftClick = () => {
    getImageFromDatabase(setPhotoFromDB)
    useStoreAddFullPostModule.setIsModalOpen(true)
  }

  const onCloseClick = () => {
    modalWithContent.setIsModalOpen(false)
  }

  useEffect(() => {
    // countData(DB_NAME, STORE_NAME).then((count: number) => {
    //   setDbCount(count)
    // })
  })

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
        {/*{dbCount > 0 && (*/}
        <GlobalButton type={'button'} callback={onOpenDraftClick}>
          Open draft
        </GlobalButton>
        {/*)}*/}
      </>
    </ModalWithContent>
  )
}
