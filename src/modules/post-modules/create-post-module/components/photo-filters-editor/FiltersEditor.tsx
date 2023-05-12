import React, { useState } from 'react'

import Image from 'next/image'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { usePostStore } from '@/store'

type PropsType = {
  isModalOpen: boolean
  filterEditorModule: (isModalOpen: boolean) => void
  useStoreAddFullPostModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
}

export const FiltersEditor = ({
  isModalOpen,
  cropEditorModule,
  filterEditorModule,
  useStoreAddFullPostModule,
  onClose,
  setIsDraftModalOpen,
}: PropsType) => {
  const [filter, setFilter] = useState('none')

  const { postPhotos, setFilteredPhoto, isLoadedFromDB } = usePostStore()

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }

  const onCloseClick = () => {
    saveFilteredPhoto()
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  const saveFilteredPhoto = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    postPhotos.map(({ uploadId, croppedPhoto, cropSize }) => {
      let image = document.getElementById(uploadId)

      if (
        !(
          image instanceof HTMLCanvasElement ||
          image instanceof HTMLImageElement ||
          image instanceof SVGImageElement ||
          image instanceof HTMLVideoElement
        )
      ) {
        return null
      }

      canvas.width = cropSize.width
      canvas.height = cropSize.height
      ctx.filter = filter

      ctx.drawImage(image, 0, 0)

      canvas.toBlob(blob => {
        if (!(blob instanceof Blob)) {
          console.error('Expected a Blob object, but received', blob)

          return
        }
        const filteredImageUrl = URL.createObjectURL(blob)

        setFilteredPhoto(uploadId, String(filteredImageUrl))
      })
    })
  }

  const onNextClick = () => {
    saveFilteredPhoto()
    useStoreAddFullPostModule(true)
    filterEditorModule(false)
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
      <div className="relative h-[500px]">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {postPhotos.map((image, idx) => {
            if (image.croppedPhoto) {
              return (
                <SwiperSlide key={image.uploadId}>
                  <Image
                    key={image.uploadId}
                    style={{ filter: filter }}
                    src={image.croppedPhoto}
                    fill
                    alt={'photo'}
                    className="object-cover"
                  />
                </SwiperSlide>
              )
            } else {
              return null
            }
          })}
        </Swiper>

        {/*<PhotoFilters imageSrc={String(imageUrl)} setFilter={onFilterClick} />*/}
      </div>
    </CreatePostModal>
  )
}
