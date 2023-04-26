import { FC, useState } from 'react'

import Image from 'next/image'
import { FaEllipsisH, FaTimes, FaPen, FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useGetPost } from '@/modules/post-modules/latest-posts/hooks/useGetPost'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { useUserStore } from '@/store'
import { Dropdown } from '@/ui/dropdown/Dropdown'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PostModal: FC<Props> = ({ isOpen, onClose }) => {
  const { postId } = useUserStore()

  const { profileAvatar, profileData } = useGetProfile()

  const { post, isLoading } = useGetPost(postId)

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const onEdit = () => {
    setIsOpenDropdown(false)
  }

  const onDelete = () => {
    setIsOpenDropdown(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      overlayClassName="fixed w-full h-full top-0 left-0 bg-dark-900 z-[100]"
      className="absolute w-full h-full max-h-[564px] max-w-[972px] bg-dark-300 border-dark-100 border rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] focus:outline-none"
    >
      <button
        className="absolute -top-8 -right-8 text-base w-6 h-6 flex items-center justify-center text-white"
        onClick={() => onClose()}
      >
        <FaTimes size={'24px'} />
      </button>

      <div className="grid grid-cols-2 h-full">
        <div>
          {isLoading ? (
            <div className="animate-pulse h-full bg-slate-200"></div>
          ) : (
            <Swiper
              className="h-full"
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              <SwiperSlide key={post?.id}>
                <Image src={post?.images[0].url!} fill alt={'gg'} className="object-cover" />
              </SwiperSlide>
            </Swiper>
          )}
        </div>

        <div>
          <div className="px-6 py-3 flex items-center justify-between border-dark-100 border-b">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-3 relative rounded-full overflow-hidden">
                <Image src={profileAvatar} fill alt={profileData.userName} />
              </div>

              <div className="text-white font-medium">{profileData.userName}</div>
            </div>

            <Dropdown isOpen={isOpenDropdown} setIsOpen={setIsOpenDropdown}>
              <div
                className="py-1.5 px-3 text-white text-sm cursor-pointer flex items-center whitespace-nowrap"
                onClick={onEdit}
              >
                <FaPen className="mr-2" /> Edit Post
              </div>
              <div
                className="py-1.5 p-3 text-white text-sm cursor-pointer flex items-center whitespace-nowrap"
                onClick={onDelete}
              >
                <FaTrash className="mr-2" /> Delete Post
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Modal>
  )
}
