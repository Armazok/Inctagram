import React, { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import plusOutline from '@/assets/icons/plus-square-outline.svg'
import plus from '@/assets/icons/plus-square.svg'
import {
  useStoreAddPostModal,
  useStoreCropEditorModal,
  useStoreFilterEditorModal,
  useStoreWithContentModal,
} from '@/components/modals/store'
import { AddFullPost } from '@/modules/post-modules/create-post-module/components/addFullPost/addFullPost'
import { CropEditor } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/CropEditor'
import { FiltersEditor } from '@/modules/post-modules/create-post-module/components/photo-filters-editor/FiltersEditor'
import { PhotoUploader } from '@/modules/post-modules/create-post-module/components/photo-uploader/PhotoUploader'
import { SaveDraftPost } from '@/modules/post-modules/create-post-module/components/save-draft-post/SaveDraftPost'
import { useImageSelector } from '@/store/storeSelectorPhoto'

export const CreatePost = () => {
  const [sidebarModule, setSidebarModule] = useState<boolean>(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)

  const { query, replace, pathname } = useRouter()

  const modalWithContent = useStoreWithContentModal()
  const cropEditorModal = useStoreCropEditorModal()
  const filterEditorModal = useStoreFilterEditorModal()
  const useStoreAddFullPostModal = useStoreAddPostModal()
  const { setImageSelector, imagesSelector } = useImageSelector()

  const onAddPhotoClick = () => {
    setSidebarModule(true)
    modalWithContent.setIsModalOpen(true)
  }

  const onCloseClick = () => {
    modalWithContent.setIsModalOpen(false)
    cropEditorModal.setIsModalOpen(false)
    replace(pathname)
  }

  useEffect(() => {
    if (query.create) {
      setSidebarModule(true)
      modalWithContent.setIsModalOpen(true)
    }
  }, [query.create])

  useEffect(() => {
    if (
      !modalWithContent.isModalOpen &&
      !cropEditorModal.isModalOpen &&
      !filterEditorModal.isModalOpen &&
      !useStoreAddFullPostModal.isModalOpen
    ) {
      setSidebarModule(false)
      replace(pathname)
    }
  }, [
    modalWithContent.isModalOpen,
    cropEditorModal.isModalOpen,
    filterEditorModal.isModalOpen,
    useStoreAddFullPostModal.isModalOpen,
  ])

  return (
    <div>
      <Link
        className="flex gap-[15px] items-center"
        onClick={onAddPhotoClick}
        href={{
          query: { create: true },
        }}
      >
        <Image src={sidebarModule ? plus : plusOutline} alt={'Create'} height={24} width={24} />
        <div className={clsx('cursor-pointer', sidebarModule && 'text-accent-500')}>Create</div>
      </Link>
      {query.create && <PhotoUploader />}
      {imagesSelector && (
        <CropEditor
          isModalOpen={cropEditorModal.isModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          cropEditorModule={cropEditorModal.setIsModalOpen}
          onClose={onCloseClick}
        />
      )}
      {filterEditorModal.isModalOpen && (
        <FiltersEditor
          isModalOpen={filterEditorModal.isModalOpen}
          cropEditorModule={cropEditorModal.setIsModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          useStoreAddFullPostModule={useStoreAddFullPostModal.setIsModalOpen}
          onClose={onCloseClick}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
      {useStoreAddFullPostModal.isModalOpen && (
        <AddFullPost
          location={false}
          isModalOpen={useStoreAddFullPostModal.isModalOpen}
          useStoreAddFullPostModule={useStoreAddFullPostModal.setIsModalOpen}
          filterEditorModule={filterEditorModal.setIsModalOpen}
          onClose={onCloseClick}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
      {isDraftModalOpen && (
        <SaveDraftPost
          isDraftModalOpen={isDraftModalOpen}
          setIsDraftModalOpen={setIsDraftModalOpen}
        />
      )}
    </div>
  )
}
