import React, { useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import { PhotoSelector, ProfileAvatarEditor } from '@/modules/profile-modules/avatar-module'
import { DeleteAvatarButton } from '@/modules/profile-modules/avatar-module/components/DeleteButton'
import { useDeleteAvatarMutation } from '@/modules/profile-modules/avatar-module/hooks/useDeleteAvatarMutation'
import { useUploadAvatarMutation } from '@/modules/profile-modules/avatar-module/hooks/useUploadAvatarMutation'
import { Avatar, GlobalButton, Preloader } from '@/ui'

type PropsType = {
  avatarUrl?: string
}
export const UploadAvatarBlock = ({ avatarUrl = '' }: PropsType) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState(avatarUrl)

  const { isLoading: isLoadingDeleteAvatar, mutate: deleteAvatar } =
    useDeleteAvatarMutation(setAvatar)

  const { isLoading: isLoadingUploadAvatar, mutate: uploadAvatar } = useUploadAvatarMutation(
    setAvatar,
    setIsModalOpen
  )

  const isAvatarShown = avatar ? avatar : ''

  const onCloseClick = () => {
    setSelectedPhoto('')
    setIsModalOpen(false)
  }

  const onSaveClick = (formData: File) => {
    uploadAvatar(formData)
    setIsModalOpen(false)
    setSelectedPhoto('')
  }

  const onAddPhotoClick = () => {
    setIsModalOpen(true)
  }

  const onDeleteAvatarClick = () => {
    deleteAvatar()
  }

  if (isLoadingUploadAvatar || isLoadingDeleteAvatar) {
    return <Preloader />
  }

  return (
    <div className={'flex flex-col flex-nowrap items-center w-52 font-medium p-[5px]'}>
      <div className={'mb-[30px] mt-[48px] w-52'}>
        <Avatar alt={'profile photo'} src={isAvatarShown} className={``} />
        {isAvatarShown && <DeleteAvatarButton onDeleteAvatarClick={onDeleteAvatarClick} />}
      </div>
      <GlobalButton
        type={'button'}
        variant={'transparent'}
        className={`text-[16px]`}
        callback={onAddPhotoClick}
      >
        Add a Profile Photo
      </GlobalButton>

      <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add a Profile Photo'}>
        <>
          {selectedPhoto ? (
            <ProfileAvatarEditor image={selectedPhoto} onSaveClick={onSaveClick} />
          ) : (
            <PhotoSelector setSelectedPhoto={setSelectedPhoto} />
          )}
        </>
      </ModalWithContent>
    </div>
  )
}
