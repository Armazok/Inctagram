import React, { FC, useState } from 'react'

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { RightDescription } from '@/modules/post-modules/create-post-module/components/description-add/rightDescription'
import { useUploadPost } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { useUserStore } from '@/store'
import { useImageSelector } from '@/store/storeSelectorPhoto'
import { Preloader } from '@/ui'

interface IAddFullPost {
  isModalOpen: boolean
  useStoreAddFullPostModule: (isModalOpen: any) => void
  filterEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
  setIsDraftModalOpen: (isModalOpen: boolean) => void
  location: boolean
  callback?: () => void
}

export const AddFullPost: FC<IAddFullPost> = ({
  isModalOpen,
  useStoreAddFullPostModule,
  filterEditorModule,
  onClose,
  setIsDraftModalOpen,
  location,
  callback,
}) => {
  const { userId } = useUserStore()
  const { imagesSelector, setDescription, description } = useImageSelector()

  const [postDescription, setPostDescription] = useState(description)
  const onSuccessPostSent = () => {
    onClose()
    setDescription('')
    useStoreAddFullPostModule(false)
  }

  const { mutate: addPhotoToThePost, isLoading } = useUploadPost(onSuccessPostSent, userId!)
  const onCloseClick = () => {
    setDescription(postDescription)
    setIsDraftModalOpen(true)
    onClose()
    useStoreAddFullPostModule(false)
  }

  const onBackClick = () => {
    filterEditorModule(true)
    useStoreAddFullPostModule(false)
  }

  const addAllPost = async () => {
    const formData = new FormData()

    await Promise.all(
      imagesSelector.map(async photo => {
        // @ts-ignore
        const response = await fetch(photo.finalUrl)
        const blob = await response.blob()

        formData.append('files', blob)
      })
    )

    formData.append('description', postDescription)
    addPhotoToThePost(formData)
  }

  if (isLoading) return <Preloader />

  return (
    <CreatePostModal
      isOpen={isModalOpen}
      onBackClick={onBackClick}
      onClose={onCloseClick}
      title={'Publication'}
      onBtnClick={addAllPost}
      showBackArrow={true}
      variant={'Publish'}
    >
      <div className={'flex flex-wrap flex-row'}>
        <div
          // className="grid grid-cols-2 h-full"
          className="max-w-[485px]"
        >
          <div>
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
                      <AddPublication key={ind} location={true} imageUrl={image} />
                    </SwiperSlide>
                  )
                } else {
                  return null
                }
              })}
            </Swiper>
          </div>
        </div>
        <div className="max-w-[480px]">
          <RightDescription
            text={postDescription}
            callback={callback}
            setText={setPostDescription}
          />
        </div>
      </div>
    </CreatePostModal>
  )
}
