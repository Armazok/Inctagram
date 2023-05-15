import React, { useState, FC, memo } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/photoFilters/PhotoFilters'
import { usePostStore } from '@/store'
import { useFilterStore } from '@/store/filterStore'
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
  const { isLoadedFromDB } = usePostStore()
  const { imagesSelector, setImageSelector, setFilterForImage } = useImageSelector()
  const { filter, setFilter } = useFilterStore()
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const onFilterClick = async (filter: string) => {
    setFilter(filter)
  }
  const onBackClick = () => {
    cropEditorModule(true)
    filterEditorModule(false)
  }
  const onNextClick = () => {
    // saveFilteredPhoto()
    useStoreAddFullPostModule(true)
    filterEditorModule(false)
  }
  const onCloseClick = () => {
    // saveFilteredPhoto()
    setIsDraftModalOpen(true)
    onClose()
    filterEditorModule(false)
  }

  // const saveFilteredPhoto = async () => {
  //   try {
  //     const updatedImages = await Promise.all(
  //       imagesSelector.map(async image => {
  //         const { croppedAreaPixels } = image.cropData || {}
  //         const { url } = image
  //
  //         if (!url) {
  //           console.error(`Image with id "${image.id}" does not have crop data`)
  //
  //           return image
  //         }
  //
  //         const croppedImage = await getCroppedImg(url, croppedAreaPixels)
  //
  //         return {
  //           ...image,
  //           filteredUrl: croppedImage as string,
  //         }
  //       })
  //     )
  //
  //     setImageSelector(updatedImages)
  //     cropEditorModule(false)
  //     filterEditorModule(true)
  //   } catch (error) {
  //     console.error('Error updating images:', error)
  //   }
  // }

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex

    setActiveSlideIndex(activeIndex)
    const image = imagesSelector[activeIndex]

    setFilterForImage(image.id, filter)
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
                      <FilterImage key={ind} srs={image} />
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
                console.log('PhotoFilters', image.filter)

                return <PhotoFilters imageSrc={image} key={ind} setFilter={onFilterClick} />
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

interface IFiltersEditor {
  srs: IPhoto
}

export const FilterImage: FC<IFiltersEditor> = memo(({ srs }) => {
  const { filter } = useFilterStore()

  return (
    <>
      <img
        className={'h-full'}
        src={String(srs.filteredUrl)}
        alt={srs.name}
        style={{ filter: filter, width: '434px' }}
        id={'image-filtered'}
      />
    </>
  )
})
