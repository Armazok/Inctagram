import React from 'react'

import {
  AddFullPost,
  CropEditor,
  FiltersEditor,
  PhotoUploader,
  SaveDraftPost,
  stateModalType,
} from '@/modules/post-modules/create-post-module'

type ModalManagerPostType = {
  onClose: () => void
  isModalOpen: string
  setModal: (value: stateModalType) => void
}

export const ModalManagerPost = ({ onClose, isModalOpen = '', setModal }: ModalManagerPostType) => {
  return (
    <>
      <PhotoUploader
        isModalOpen={isModalOpen === 'photo-uploader'}
        onClose={onClose}
        setModal={setModal}
      />
      <CropEditor
        isModalOpen={isModalOpen === 'crop-editor'}
        onClose={onClose}
        setModal={setModal}
      />
      <FiltersEditor
        isModalOpen={isModalOpen === 'filters-editor'}
        onClose={onClose}
        setModal={setModal}
      />
      <AddFullPost
        isModalOpen={isModalOpen === 'add-full-post'}
        onClose={onClose}
        setModal={setModal}
        location={false}
      />
      <SaveDraftPost
        isModalOpen={isModalOpen === 'save-draft-post'}
        onClose={onClose}
        setModal={setModal}
      />
    </>
  )
}
