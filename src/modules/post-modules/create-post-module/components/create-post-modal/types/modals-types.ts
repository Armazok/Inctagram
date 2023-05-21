export type stateModalType =
  | 'photo-uploader'
  | 'crop-editor'
  | 'filters-editor'
  | 'add-full-post'
  | 'save-draft-post'
  | ''

export type modalType = {
  isModalOpen: boolean
  onClose: () => void
  setModal: (value: stateModalType) => void
}
