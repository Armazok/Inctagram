import React, { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PATH_ROUTE } from '@/common'
import { modalType } from '@/modules/post-modules/create-post-module'
import { CreatePostModal } from '@/modules/post-modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/post-modules/create-post-module/components/description-add/add-publication'
import { RightDescription } from '@/modules/post-modules/create-post-module/components/description-add/rightDescription'
import { useUploadPost } from '@/modules/post-modules/create-post-module/hooks/useAddPostImgMutation'
import { useUserStore } from '@/store'
import { useImageSelector } from '@/store/storeSelectorPhoto'
import { Preloader } from '@/ui'

interface IAddFullPost {
  location?: boolean
}

export const AddFullPost: FC<IAddFullPost & modalType> = ({ isModalOpen, setModal, onClose }) => {
  const { userId } = useUserStore()
  const { imagesSelector, setDescription, description } = useImageSelector()
  const { push } = useRouter()

  const [postDescription, setPostDescription] = useState(description)

  const onSuccessPostSent = async () => {
    onClose()
    setDescription('')
    push(PATH_ROUTE.PROFILE)
  }

  const { mutate: addPhotoToThePost, isLoading } = useUploadPost(onSuccessPostSent, userId!)
  const onCloseClick = async () => {
    setDescription(postDescription)
    await setModal('save-draft-post')
  }

  const onBackClick = () => {
    setModal('filters-editor')
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
          <RightDescription text={postDescription} setText={setPostDescription} />
        </div>
      </div>
    </CreatePostModal>
  )
}
