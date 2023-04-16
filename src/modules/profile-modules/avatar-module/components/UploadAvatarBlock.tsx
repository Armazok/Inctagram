import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { ModalWithContent } from '@/components/modals'
import {
  PhotoSelector,
  ProfileAvatarEditor,
  sendAvatar,
} from '@/modules/profile-modules/avatar-module'
import { Avatar, GlobalButton, Preloader } from '@/ui'

type PropsType = {
  avatarUrl?: string
}
export const UploadAvatarBlock = ({ avatarUrl = '' }: PropsType) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatar, setAvatar] = useState('')

  const { isLoading, mutate } = useMutation({
    mutationFn: sendAvatar,
    onSuccess: data => {
      setIsModalOpen(false)
      setAvatar(data.data.avatar[0].url)
    },
  })

  const onCloseClick = () => {
    setSelectedPhoto('')
    setIsModalOpen(false)
  }

  const onSaveClick = (formData: File) => {
    mutate(formData)
    setIsModalOpen(false)
    setSelectedPhoto('')
  }

  const onAddPhotoClick = () => {
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'flex flex-col flex-nowrap items-center w-52 font-medium p-[5px]'}>
      <Avatar
        alt={'profile photo'}
        src={avatar ? avatar : avatarUrl ? avatarUrl : ''}
        // src={''}
        className={`mb-[30px] mt-[48px]`}
      />
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
