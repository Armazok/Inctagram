import { FC } from 'react'

import Image from 'next/image'
import { FaTimes, FaEllipsisH } from 'react-icons/fa'
import Modal from 'react-modal'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useGetPost } from '@/modules/post-modules/latest-posts/hooks/useGetPost'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PostModal: FC<Props> = ({ isOpen, onClose }) => {
  const { data } = useGetPost()
  const { profileAvatar, profileData } = useGetProfile()

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="fixed w-full h-full top-0 left-0 bg-dark-900 z-[100]"
      className="absolute w-full h-full max-h-[564px] max-w-[972px] bg-dark-300 border-dark-100 border rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] focus:outline-none"
    >
      <button
        className="absolute -top-8 -right-8 text-[16px] w-[24px] h-[24px] flex items-center justify-center text-white"
        onClick={() => onClose()}
      >
        <FaTimes size={'24px'} />
      </button>

      <div className="grid grid-cols-2 h-full">
        <div>
          <Swiper
            className="h-full"
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            {data?.response?.results?.map(photo => (
              <SwiperSlide key={photo.id}>
                <Image
                  src={photo.urls.regular}
                  fill
                  alt={photo.alt_description || ''}
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <div className="px-6 py-3 flex items-center justify-between border-dark-100 border-b">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-3 relative rounded-full overflow-hidden">
                <Image src={profileAvatar} fill alt={profileData.userName} />
              </div>

              <div className="text-white font-medium">{profileData.userName}</div>
            </div>

            <button className="text-[16px] w-6 h-6 flex items-center justify-center text-white">
              <FaEllipsisH />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
