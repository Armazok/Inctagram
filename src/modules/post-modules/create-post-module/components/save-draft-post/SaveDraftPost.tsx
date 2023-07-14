import React from 'react'

import { Confirm } from '@/components/modals'
import { modalType } from '@/modules/post-modules/create-post-module'
import { indexedDbPostDraft } from '@/modules/post-modules/create-post-module/indexedDB/indexedDbPostDraft.repository'
import { saveDraftPost } from '@/modules/post-modules/create-post-module/indexedDB/saveDraftPost'
import { useImageSelector } from '@/store/storeSelectorPhoto'

type PropsType = modalType

export const SaveDraftPost = ({ isModalOpen, onClose }: PropsType) => {
  const { imagesSelector, description, setDescription } = useImageSelector()

  const onConfirmClick = async () => {
    await saveDraftPost(imagesSelector, description)
    onClose()
    setDescription('')
  }

  const onDiscardClick = async () => {
    // await postPhotos.forEach(photo => {
    //   URL.revokeObjectURL(photo.croppedPhoto)
    //   URL.revokeObjectURL(photo.filteredPhoto)
    // })
    await indexedDbPostDraft.clearPreviousDraft()
    onClose()
  }

  return (
    <div>
      <Confirm
        isOpen={isModalOpen}
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
