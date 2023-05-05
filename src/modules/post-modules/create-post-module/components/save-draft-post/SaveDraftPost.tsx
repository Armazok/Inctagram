import React from 'react'

import { Confirm } from '@/components/modals'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { clearDatabase } from '@/modules/post-modules/create-post-module/utils/clearDatabase'
import { setItemToDatabase } from '@/modules/post-modules/create-post-module/utils/setItemToDatabase'
import { usePostStore } from '@/store'

type PropsType = {
  isDraftModalOpen: boolean
  setIsDraftModalOpen: (isDraftModalOpen: boolean) => void
}

export const SaveDraftPost = ({ setIsDraftModalOpen, isDraftModalOpen }: PropsType) => {
  const { postPhotos, clearPostPhotos } = usePostStore()

  const clearPreviousDraft = async () => {
    await clearDatabase({
      dbName: IMAGES.DB_NAME,
      storeName: IMAGES.STORE_NAME,
      keyPath: IMAGES.KEY_PATH,
    })
  }
  const onConfirmClick = async () => {
    clearPreviousDraft().then(() => {
      postPhotos.forEach(photo => {
        const imageData = {
          data: photo,
          timestamp: Date.now(),
        }
        setItemToDatabase({
          keyPath: IMAGES.KEY_PATH,
          storeName: IMAGES.STORE_NAME,
          dbName: IMAGES.DB_NAME,
          itemData: imageData,
        })
      })

      // set draft to indexed db
    })

    setIsDraftModalOpen(false)
  }

  const onDiscardClick = async () => {
    clearPreviousDraft()
    await postPhotos.forEach(photo => {
      URL.revokeObjectURL(photo.croppedPhoto)
      URL.revokeObjectURL(photo.filteredPhoto)
    })
    clearPostPhotos()
    setIsDraftModalOpen(false)
  }

  return (
    <div>
      <Confirm
        isOpen={isDraftModalOpen}
        onConfirm={onConfirmClick}
        onClose={onDiscardClick}
        onDecline={onDiscardClick}
        text={'Do you want to save draft?'}
        title={'Draft post'}
        confirmButtonText={'Save Draft'}
        declineButtonText={'Discard'}
      />
    </div>
  )
}
