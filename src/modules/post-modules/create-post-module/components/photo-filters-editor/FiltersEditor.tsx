import React, { useState } from 'react'
import { CreatePostModal } from '@/components/modals/create-post-modal/CreatePostModal'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'

type PropsType = {
  cropSize: any
  imageUrl: string
  setFilteredImage: (filteredPhoto: string) => void
  isModalOpen: boolean
  setOpenModal: (isModalOpen: any) => void
}

export const FiltersEditor = ({
  setFilteredImage,
  imageUrl,
  cropSize,
  setOpenModal,
  isModalOpen,
}: PropsType) => {
  const [filter, setFilter] = useState('none')

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onCloseClick = () => {
    setFilter('none')
    setOpenModal('cropping')
  }
  const onNextClick = () => {
    if (filter === 'none') {
      setFilteredImage(imageUrl)
    }

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

    // canvas.toBlob((blob: string | Blob) => {
    //   const formData = new FormData()
    //   formData.append('file', blob)
    //   //sendPost(formData)
    // })

    canvas.toBlob(blob => {
      //@ts-ignore
      const filteredImageUrl = URL.createObjectURL(blob)
      setFilteredImage(String(filteredImageUrl))
    })

    setOpenModal('publication')
  }

  return (
    <CreatePostModal
      isOpen={isModalOpen}
      onClose={onCloseClick}
      title={'Filter'}
      onBackClick={onCloseClick}
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
