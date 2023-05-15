import React, { useState, FC, memo } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { usePostStore } from '@/store'
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'

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

  const { isLoadedFromDB } = usePostStore()

  const { imagesSelector } = useImageSelector()

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }

  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }

  const onCloseClick = () => {
    // saveFilteredPhoto()
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  // const saveFilteredPhoto = () => {
  //   const canvas = document.createElement('canvas')
  //   const ctx = canvas.getContext('2d')
  //
  //   if (!ctx) {
  //     return null
  //   }
  //
  //   postPhotos.map(({ uploadId, croppedPhoto, cropSize }) => {
  //     let image = document.getElementById(uploadId)
  //
  //     if (
  //       !(
  //         image instanceof HTMLCanvasElement ||
  //         image instanceof HTMLImageElement ||
  //         image instanceof SVGImageElement ||
  //         image instanceof HTMLVideoElement
  //       )
  //     ) {
  //       return null
  //     }
  //
  //     canvas.width = cropSize.width
  //     canvas.height = cropSize.height
  //     ctx.filter = filter
  //
  //     ctx.drawImage(image, 0, 0)
  //
  //     canvas.toBlob(blob => {
  //       if (!(blob instanceof Blob)) {
  //         console.error('Expected a Blob object, but received', blob)
  //
  //         return
  //       }
  //       const filteredImageUrl = URL.createObjectURL(blob)
  //
  //       setFilteredPhoto(uploadId, String(filteredImageUrl))
  //     })
  //   })
  // }

  const onNextClick = () => {
    // saveFilteredPhoto()
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
          {imagesSelector.map((image, ind) => {
            if (image) {
              return (
                <SwiperSlide key={ind}>
                  <FilterImage key={ind} srs={image} />
                </SwiperSlide>
              )
            } else {
              return null
            }
          })}
        </Swiper>
        <div>{/*<PhotoFilters imageSrc={image.url} setFilter={onFilterClick} />*/}</div>
      </div>
    </CreatePostModal>
  )
}

interface IFiltersEditor {
  srs: IPhoto
}

export const FilterImage: FC<IFiltersEditor> = memo(({ srs }) => {
  const [filter, setFilter] = useState('none')

  console.log('srs.filteredUrl', srs.filteredUrl)

  return (
    <>
      <img
        src={String(srs.filteredUrl)}
        alt={srs.name}
        style={{ width: '434px' }}
        id={'image-filtered'}
      />
    </>
  )
})
