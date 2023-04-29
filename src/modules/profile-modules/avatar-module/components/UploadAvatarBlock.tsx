import React, { useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import { PhotoSelector, ProfileAvatarEditor } from '@/modules/profile-modules/avatar-module'
import { DeleteAvatarButton } from '@/modules/profile-modules/avatar-module/components/avatar-delete-button/DeleteButton'
import { useDeleteAvatar } from '@/modules/profile-modules/avatar-module/hooks/useDeleteAvatar'
import { useUploadAvatar } from '@/modules/profile-modules/avatar-module/hooks/useUploadAvatar'
import { Avatar, GlobalButton, Preloader } from '@/ui'

type PropsType = {
  avatarUrl?: string
}
export const UploadAvatarBlock = ({ avatarUrl = '' }: PropsType) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState(avatarUrl)

  const onDeleteSuccess = () => {
    setAvatar('')
  }

  const onUploadSuccess = (avatar: string) => {
    setAvatar(avatar)
    setIsModalOpen(false)
  }

  const { isLoading: isLoadingDeleteAvatar, mutate: deleteAvatar } =
    useDeleteAvatar(onDeleteSuccess)

  const { isLoading: isLoadingUploadAvatar, mutate: uploadAvatar } =
    useUploadAvatar(onUploadSuccess)

  const isDisabled = isLoadingUploadAvatar || isLoadingDeleteAvatar
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
        {isAvatarShown && (
          <DeleteAvatarButton onDeleteAvatarClick={onDeleteAvatarClick} disabled={isDisabled} />
        )}
      </div>
      <GlobalButton
        type={'button'}
        variant={'transparent'}
        className={`text-[16px]`}
        callback={onAddPhotoClick}
        disabled={isDisabled}
      >
        Add a Profile Photo
      </GlobalButton>

      <ModalWithContent isOpen={isModalOpen} onClose={onCloseClick} title={'Add a Profile Photo'}>
        <>
          {selectedPhoto ? (
            <ProfileAvatarEditor
              image={selectedPhoto}
              onSaveClick={onSaveClick}
              disabled={isLoadingUploadAvatar}
            />
          ) : (
            <PhotoSelector setSelectedPhoto={setSelectedPhoto} />
          )}
        </>
      </ModalWithContent>
    </div>
  )
}
