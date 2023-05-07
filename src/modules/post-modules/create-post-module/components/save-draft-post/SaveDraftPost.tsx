import React from 'react'

import { clearDatabase } from '@/common/utils/indexedDb/clearDatabase'
import { Confirm } from '@/components/modals'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { setNewPostToIndexedDB } from '@/modules/post-modules/create-post-module/utils/setNewPostToIndexedDB'
import { usePostStore } from '@/store'

type PropsType = {
  isDraftModalOpen: boolean
  setIsDraftModalOpen: (isDraftModalOpen: boolean) => void
}

export const SaveDraftPost = ({ setIsDraftModalOpen, isDraftModalOpen }: PropsType) => {
  const { postPhotos, clearPostPhotos, postDescription } = usePostStore()

  const clearPreviousDraft = async () => {
    await clearDatabase({
      dbName: IMAGES.DB_NAME,
      storeName: IMAGES.STORE_NAME,
      keyPath: IMAGES.KEY_PATH,
    })
  }

  const onConfirmClick = async () => {
    await clearPreviousDraft()
    setNewPostToIndexedDB(postPhotos, postDescription)
    clearPostPhotos()
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
