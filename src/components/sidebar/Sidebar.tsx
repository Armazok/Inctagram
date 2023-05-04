import React, { FC, useEffect, useState } from 'react'

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

import {
  useStoreAddPostModule,
  useStoreCropEditorModule,
  useStoreFilterEditorModule,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { LogoutButton } from '@/modules/auth-modules/login-module/logout'
import { AddFullPost } from '@/modules/post-modules/create-post-module/components/addFullPost/addFullPost'
import { CropEditor } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/CropEditor'
import { FiltersEditor } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/FiltersEditor'
// @ts-ignore
import { PhotoUploader } from '@/modules/post-modules/create-post-module/components/photo-uploader/PhotoUploader'
import { SaveDraftPost } from '@/modules/post-modules/create-post-module/components/save-draft-post/SaveDraftPost'

export const Sidebar: FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [sidebarModule, setSidebarModule] = useState<boolean>(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)
  const [cropSize, setCropSize] = useState<{
    width: number
    height: number
  }>({
    width: 100,
    height: 100,
  })
  const modalWithContent = useStoreWithContentModal()
  const cropEditorModule = useStoreCropEditorModule()
  const filterEditorModule = useStoreFilterEditorModule()
  const useStoreAddFullPostModule = useStoreAddPostModule()
  // const { setSelectedPhoto: setSelectedPhotoToStore } = usePostStore()
  const onAddPhotoClick = () => {
    setSidebarModule(true)
    modalWithContent.setIsModalOpen(true)
  }

  const onCloseClick = () => {
    setSelectedPhoto('')
    setIsDraftModalOpen(true)
    modalWithContent.setIsModalOpen(false)
  }

  useEffect(() => {
    if (
      !modalWithContent.isModalOpen &&
      !cropEditorModule.isModalOpen &&
      !filterEditorModule.isModalOpen &&
      !useStoreAddFullPostModule.isModalOpen
    ) {
      setSidebarModule(false)
    }
  }, [
    modalWithContent.isModalOpen,
    cropEditorModule.isModalOpen,
    filterEditorModule.isModalOpen,
    useStoreAddFullPostModule.isModalOpen,
  ])

  const { pathname } = useRouter()

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
            <Image src={sidebarModule ? plus : plusOutline} alt={'Create'} height={24} width={24} />
            <div className={clsx('cursor-pointer', sidebarModule && 'text-accent-500')}>Create</div>
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
      <PhotoUploader setSelectedPhoto={setSelectedPhoto} />
      {selectedPhoto && (
        <CropEditor
          setSelectedPhoto={setSelectedPhoto}
          isModalOpen={cropEditorModule.isModalOpen}
          filterEditorModule={filterEditorModule.setIsModalOpen}
          cropEditorModule={cropEditorModule.setIsModalOpen}
          image={selectedPhoto}
          setCropSize={setCropSize}
          onClose={onCloseClick}
        />
      )}
      {filterEditorModule.isModalOpen && (
        <FiltersEditor
          cropSize={cropSize}
          isModalOpen={filterEditorModule.isModalOpen}
          cropEditorModule={cropEditorModule.setIsModalOpen}
          filterEditorModule={filterEditorModule.setIsModalOpen}
          useStoreAddFullPostModule={useStoreAddFullPostModule.setIsModalOpen}
          onClose={onCloseClick}
        />
      )}
      {useStoreAddFullPostModule.isModalOpen && (
        <AddFullPost
          isModalOpen={useStoreAddFullPostModule.isModalOpen}
          useStoreAddFullPostModule={useStoreAddFullPostModule.setIsModalOpen}
          filterEditorModule={filterEditorModule.setIsModalOpen}
          onClose={onCloseClick}
        />
      )}
      {isDraftModalOpen && (
        <SaveDraftPost
          isDraftModalOpen={isDraftModalOpen}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
    </aside>
  )
}
