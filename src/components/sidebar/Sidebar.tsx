import React, { FC, useState } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import bookmarkOutline from '../../assets/icons/bookmark-outline.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import homeOutline from '../../assets/icons/home-outline.svg'
import home from '../../assets/icons/home.svg'
import personOutline from '../../assets/icons/person-outline.svg'
import person from '../../assets/icons/person.svg'
import plusOutline from '../../assets/icons/plus-square-outline.svg'
import plus from '../../assets/icons/plus-square.svg'
import trendingOutline from '../../assets/icons/trending-up-outline.svg'
import trending from '../../assets/icons/trending-up.svg'

import { ModalWithContent } from '@/components/modals'
import { CreatePostModal } from '@/components/modals/create-post-modal/CreatePostModal'
import { LogoutButton } from '@/modules/auth-modules/login-module/logout'
import { AddFullPost } from '@/modules/post-modules/create-post-module/components/addFullPost/addFullPost'
import { FiltersEditor } from '@/modules/post-modules/create-post-module/components/filters-editor/FiltersEditor'
import { useAddAllPostMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddAllPost'
import { useUploadAvatarMutation } from '@/modules/post-modules/create-post-module/components/hooks/useAddPostImgMutation'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { PhotoEditor } from '@/modules/profile-modules/create-post/PhotoEditor'

export const Sidebar: FC = () => {
  const { pathname, push } = useRouter()
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openModal, setOpenModal] = useState('')
  const [filteredImage, setFilteredImage] = useState(selectedPhoto)
  const [cropSize, setCropSize] = useState<{
    width: number
    height: number
  }>({
    width: 100,
    height: 100,
  })
  const { mutate: addImgPost, data: imgData } = useUploadAvatarMutation(() => '')
  const url = (imgData && imgData.data.images[0].url) || ''
  const uploadId = (imgData && imgData.data.images[0].uploadId) || ''

  const onAddPhotoClick = () => {
    setIsModalOpen(true)
  }

  const onCloseClick = () => {
    setSelectedPhoto('')
    setIsModalOpen(false)
  }

  const addImgPub = () => {
    addImgPost(filteredImage as File)
    setOpenModal('publication')
  }

  const { data: allDataPost } = useAddAllPostMutation(() => push('/profile'))
  const description = (allDataPost && allDataPost.data.description) || ''

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col">
          <li className="flex gap-[15px] items-center">
            <Image
              src={pathname === '/home' ? home : homeOutline}
              alt={'Home'}
              height={24}
              width={24}
            />
            <Link href={'/'} className={pathname === '/' ? 'text-accent-500' : ''}>
              Home
            </Link>
          </li>
          <li className="flex gap-[15px] items-center" onClick={onAddPhotoClick}>
            <Image src={isModalOpen ? plus : plusOutline} alt={'Create'} height={24} width={24} />
            <div className={clsx('cursor-pointer', isModalOpen && 'text-accent-500')}>Create</div>
          </li>
          <li className="flex gap-[15px] items-center">
            <Image
              src={pathname === '/profile' ? person : personOutline}
              alt={'Profile'}
              height={24}
              width={24}
            />
            <Link href={'/profile'} className={pathname === '/profile' ? 'text-accent-500' : ''}>
              My profile
            </Link>
          </li>
          <li className="flex gap-[15px] items-center mt-14">
            <Image
              src={pathname === '/statistics' ? trending : trendingOutline}
              alt={'Statistic'}
              height={24}
              width={24}
            />
            <Link
              href={'/statistics'}
              className={pathname === '/statistics' ? 'text-accent-500' : ''}
            >
              Statistics
            </Link>
          </li>
          <li className="flex gap-[15px] items-center">
            <Image
              src={pathname === '/favorites' ? bookmark : bookmarkOutline}
              alt={'Favorites'}
              height={24}
              width={24}
            />
            <Link
              href={'/favorites'}
              className={pathname === '/favorites' ? 'text-accent-500' : ''}
            >
              Favorites
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
      <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add photo'}>
        <PhotoSelector setSelectedPhoto={setSelectedPhoto} />
      </ModalWithContent>
      {selectedPhoto && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={onCloseClick}
          onBackClick={() => setSelectedPhoto('')}
          title={'Cropping'}
          onBtnClick={() => setOpenModal('filters')}
          variant={true}
        >
          <PhotoEditor
            image={selectedPhoto}
            setSelectedPhoto={setSelectedPhoto}
            setCropSize={setCropSize}
          />
        </CreatePostModal>
      )}

      {openModal === 'filters' && (
        <FiltersEditor
          cropSize={cropSize}
          imageUrl={String(selectedPhoto)}
          setFilteredImage={setFilteredImage}
          isModalOpen={isModalOpen}
          setOpenModal={setOpenModal}
        />
      )}

      <AddFullPost
        description={description}
        url={url}
        uploadId={uploadId}
        filteredImage={filteredImage}
        isModalOpen={isModalOpen}
        openModal={openModal}
        onCloseClick={onCloseClick}
      />
    </aside>
  )
}
