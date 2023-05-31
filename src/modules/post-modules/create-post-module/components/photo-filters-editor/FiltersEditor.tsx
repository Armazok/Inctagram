import React, { useState } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { modalType } from '@/modules/post-modules/create-post-module'
import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import getCroppedImg from '@/modules/post-modules/create-post-module/components/photo-crop-editor/utils/canvasUtils'
import { FilterImage } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/FilterImage'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { usePostStore } from '@/store'
import { useImageSelector } from '@/store/storeSelectorPhoto'

type PropsType = modalType

export const FiltersEditor = ({ isModalOpen, setModal }: PropsType) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const { isLoadedFromDB } = usePostStore()
  const { imagesSelector, setFilterStyleForImage, setImageSelector } = useImageSelector()
  const handleFilterChange = (id: string, filterStyle: string) => {
    setFilterStyleForImage(id, filterStyle)
  }

  const setFilteredPhotos = async () => {
    try {
      const updatedImages = await Promise.all(
        imagesSelector.map(async image => {
          const { url } = image
          const { croppedAreaPixels } = image.cropData || {}
          const { filterStyle } = image.cropData || {}

          if (!url) {
            console.error(`Image with id "${image.id}" does not have crop data`)

            return image
          }

          const croppedImage = await getCroppedImg(url, croppedAreaPixels, filterStyle)

          return {
            ...image,
            finalUrl: croppedImage as string,
          }
        })
      )

      setImageSelector(updatedImages)
    } catch (error) {
      console.error('Error updating images:', error)
    }
  }
  const onNextClick = async () => {
    await setFilteredPhotos()
    setModal('add-full-post')
  }

  const onBackClick = () => {
    setModal('crop-editor')
  }
  const onCloseClick = async () => {
    await setFilteredPhotos()
    await setModal('save-draft-post')
  }

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex

    setActiveSlideIndex(activeIndex)
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
        <div className="grid grid-cols-2 h-full">
          <div>
            <Swiper
              className="h-full"
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={handleSlideChange}
            >
              {imagesSelector.map((image, ind) => {
                if (image) {
                  return (
                    <SwiperSlide key={ind}>
                      <FilterImage
                        key={ind}
                        filterStyle={image.cropData?.filterStyle! || 'none'}
                        srs={image}
                      />
                    </SwiperSlide>
                  )
                } else {
                  return null
                }
              })}
            </Swiper>
          </div>
          <div>
            {imagesSelector.map((image, ind) => {
              if (ind === activeSlideIndex) {
                return (
                  <PhotoFilters
                    imageSrc={image}
                    key={ind}
                    setFilter={filter => handleFilterChange(image.id, filter)}
                  />
                )
              } else {
                return null
              }
            })}
          </div>
        </div>
      </div>
    </CreatePostModal>
  )
}
