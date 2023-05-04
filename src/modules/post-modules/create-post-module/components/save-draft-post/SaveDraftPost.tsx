import React from 'react'

import { Confirm } from '@/components/modals'
import { clearDatabase } from '@/modules/post-modules/create-post-module/utils/clearDatabase'
import { setItemToDatabase } from '@/modules/post-modules/create-post-module/utils/setItemToDatabase'
import { usePostStore } from '@/store'

type PropsType = {
  isDraftModalOpen: boolean
  setIsDraftModalOpen: (isDraftModalOpen: boolean) => void
}

export const SaveDraftPost = ({ setIsDraftModalOpen, isDraftModalOpen }: PropsType) => {
  const { postPhotos, clearPostPhotos } = usePostStore()
  const onConfirmClick = () => {
    // set draft to indexed db
    postPhotos.forEach(photo => {
      const imageData = {
        data: photo,
        timestamp: Date.now(),
      }

      setItemToDatabase(imageData)
    })

    setIsDraftModalOpen(false)
  }

  const onDiscardClick = () => {
    clearDatabase()
    clearPostPhotos()
    //     revoke obj url
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
