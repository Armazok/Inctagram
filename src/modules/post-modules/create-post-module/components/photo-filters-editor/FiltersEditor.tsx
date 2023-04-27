import React, { useState } from 'react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { useUploadAvatarMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { useUserStore } from '@/store'

type PropsType = {
  cropSize: any
  imageUrl: string
  isModalOpen: boolean
  setOpenModal: (isModalOpen: any) => void
  selectedPhoto: string | File | null
}

export const FiltersEditor = ({ imageUrl, cropSize, setOpenModal, isModalOpen }: PropsType) => {
  const { setUploadId } = useUserStore()
  const [filter, setFilter] = useState('none')

  const { mutate: addPhotoToThePost } = useUploadAvatarMutation(val => {
    setUploadId(val && val[0].uploadId)
  })

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onCloseClick = () => {
    setFilter('none')
    setOpenModal('cropping')
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

    // @ts-ignore
    canvas.toBlob((blob: string | Blob) => {
      const formData = new FormData()

      formData.append('file', blob)

      addPhotoToThePost(formData)
    })

    // canvas.toBlob(blob => {
    //   //@ts-ignore
    //   const filteredImageUrl = URL.createObjectURL(blob)
    //
    //   setFilteredImage(String(filteredImageUrl))
    // })

    setOpenModal('publication')
  }

  return (
    <CreatePostModal
      variant={true}
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
