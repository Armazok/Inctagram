import React, { useState } from 'react'

import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
  useStoreFilterEditorModal,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { usePostStore } from '@/store'

type PropsType = {
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const FiltersEditor = ({ onClose, setIsDraftModalOpen }: PropsType) => {
  const [filter, setFilter] = useState('none')

  const { postPhotos, setFilteredPhoto, isLoadedFromDB } = usePostStore()
  const imageUrl = postPhotos[0].croppedPhoto
  const { uploadId, cropSize } = postPhotos[0]

  const { isModalOpen } = useStoreWithContentModal()
  const cropEditorModal = useStoreCropEditorModal()
  const filterEditorModal = useStoreFilterEditorModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onBackClick = () => {
    cropEditorModal.setIsModalOpen(true)
    filterEditorModal.setIsModalOpen(false)
  }

  const onCloseClick = () => {
    saveFilteredPhoto()
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModal.setIsModalOpen(false)
  }

  const saveFilteredPhoto = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let image = document.getElementById('image-filtered')

    if (!ctx || !image) {
      return null
    }
    canvas.width = cropSize.width
    canvas.height = cropSize.height
    ctx.filter = filter

    //@ts-ignore
    ctx.drawImage(image, 0, 0)

    canvas.toBlob(blob => {
      //@ts-ignore
      const filteredImageUrl = URL.createObjectURL(blob)

      setFilteredPhoto(uploadId, String(filteredImageUrl))
    })
  }

  const onNextClick = () => {
    saveFilteredPhoto()
    useStoreAddFullPostModal.setIsModalOpen(true)
    filterEditorModal.setIsModalOpen(false)
  }

  return (
    <CreatePostModal
      showBackArrow={!isLoadedFromDB}
      onBackClick={onBackClick}
      variant={'Next'}
      isOpen={isModalOpen}
      onClose={onCloseClick}
      title={'Filter'}
      onBtnClick={onNextClick}
    >
      <div className={'flex flex-wrap justify-between'}>
        <div className={`w-[436px]`}>
          <img
            src={imageUrl}
            alt="photo"
            style={{ filter: filter, width: '434px' }}
            id={'image-filtered'}
          />
        </div>
        <PhotoFilters imageSrc={imageUrl} setFilter={onFilterClick} />
      </div>
    </CreatePostModal>
  )
}
