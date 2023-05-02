import React from 'react'
import { Confirm } from '@/components/modals'
import { clearDatabase } from '@/modules/post-modules/create-post-module/utils/clearDatabase'

type PropsType = {
  isDraftModalOpen: boolean
  setIsDraftModalOpen: (isDraftModalOpen: boolean) => void
}

export const SaveDraftPost = ({ setIsDraftModalOpen, isDraftModalOpen }: PropsType) => {
  const onConfirmClick = () => {
    // set to indexed db
    setIsDraftModalOpen(false)
  }

  const onCancelClick = () => {
    clearDatabase()
    //     revoke obj url
    setIsDraftModalOpen(false)
  }

  return (
    <div>
      <Confirm
        isOpen={isDraftModalOpen}
        onConfirm={onConfirmClick}
        onClose={onCancelClick}
        onDecline={onCancelClick}
        text={'Do you want to save draft?'}
        title={'Draft post'}
        confirmButtonText={'Save'}
        declineButtonText={'Cancel'}
      />
    </div>
  )
}
