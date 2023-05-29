import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { ModalWithContent } from '@/components/modals'
import { modalType } from '@/modules/post-modules/create-post-module'
import { getDraftPost } from '@/modules/post-modules/create-post-module/indexedDB/getDraftPost'
import { indexedDbPostDraft } from '@/modules/post-modules/create-post-module/indexedDB/indexedDbPostDraft.repository'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { useImageSelector } from '@/store/storeSelectorPhoto'
import { GlobalButton } from '@/ui'

type PropsType = modalType
export const PhotoUploader = ({ isModalOpen, onClose, setModal }: PropsType) => {
  const [imageDbCount, setImageDbCount] = useState(0)

  const { replace, pathname } = useRouter()

  const { setImageSelector, setDescription } = useImageSelector()

  const onOpenDraftClick = async () => {
    await setImageSelector([])
    //@ts-ignore
    const { photoArray, description } = await getDraftPost()

    await setImageSelector(photoArray)
    debugger
    await setDescription(description)
    setModal('add-full-post')
  }

  const onCloseClick = () => {
    onClose()
    replace(pathname)
  }

  const checkCountDB = async () => {
    const count = await indexedDbPostDraft.checkCountDraftPost()

    setImageDbCount(count)
  }

  useEffect(() => {
    checkCountDB()
  }, [isModalOpen])

  return (
    <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add photo'}>
      <>
        <PhotoSelector isModalOpen={isModalOpen} setModal={setModal} maxImageSize={5} />
        {imageDbCount > 0 && (
          <GlobalButton type={'button'} callback={onOpenDraftClick}>
            Open draft
          </GlobalButton>
        )}
      </>
    </ModalWithContent>
  )
}
