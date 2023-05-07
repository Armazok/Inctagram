import React, { useState } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { usePostStore } from '@/store'

type PropsType = {
  cropSize: any
  isModalOpen: boolean
  filterEditorModule: (isModalOpen: boolean) => void
  useStoreAddFullPostModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const FiltersEditor = ({
  cropSize,
  isModalOpen,
  cropEditorModule,
  filterEditorModule,
  useStoreAddFullPostModule,
  onClose,
  setIsDraftModalOpen,
}: PropsType) => {
  const { postPhotos } = usePostStore()

  const imageUrl = postPhotos[0].croppedPhoto
  const uploadId = postPhotos[0].uploadId

  const { setFilteredPhoto } = usePostStore()
  const [filter, setFilter] = useState('none')

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }

  const onCloseClick = () => {
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  const onNextClick = () => {
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

    useStoreAddFullPostModule(true)
    filterEditorModule(false)
  }

  return (
    <CreatePostModal
      showBackArrow={true}
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
