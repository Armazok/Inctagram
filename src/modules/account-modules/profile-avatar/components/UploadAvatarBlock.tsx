import React, { useState, useRef } from 'react'
import ImagePlaceholder from 'next/image'
import { Avatar } from '@/ui/avatar/Avatar'
import GlobalButton from '@/ui/buttons/GlobalButton'
import { ModalWithContent } from '@/components/modals/modalWithContent/ModalWithContent'
import { ProfileAvatarEditor } from '@/modules/account-modules/profile-avatar/components/ProfileAvatarEditor'
import { useMutation } from '@tanstack/react-query'
import { sendAvatar } from '@/modules/account-modules/profile-avatar/api/avatar-api'
import Preloader from '@/components/atoms/preloader/Preloader'
import placeholder from '@/assets/images/img-placeholder.png'

export const UploadAvatarBlock = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<string | File | null>('')

  const { isLoading, mutate, data } = useMutation({
    mutationFn: sendAvatar,
    onSuccess: () => {
      setIsModalOpen(false)
      // debugger
      // if (data) {
      //   setAvatar(data.avatar[0].url)
      // }
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

  const handleFileSelect = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]
      //
      // if (file.size > 1572864) {
      //   setError('Please select a file with smaller size. Maximum  size is 1,5 MB.')
      //   return
      // }

      // const reader = new FileReader()
      // reader.onload = event => {
      //   const img = new Image()
      //   img.onload = () => {
      //     // Get the width and height of the image
      //     const width = img.width
      //     const height = img.height
      //
      //     if (width > 1280 || height > 720) {
      //       debugger
      //       setError(
      //         'Please select a file with smaller size. Max width is 1280px and max height is 720px.'
      //       )
      //     }
      //     console.log('Image width:', width)
      //     console.log('Image height:', height)

      setSelectedPhoto(file)

      // }

      // Set the src of the Image object
      // img.src = event.target.result as string;
      // }
    }
  }

  const onAddPhotoClick = () => {
    setIsModalOpen(true)
  }

  const onSelectClick = () => {
    //@ts-ignore
    document.getElementById('fileInput').click()
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'flex flex-col flex-nowrap items-center w-52 font-medium p-[5px]'}>
      <Avatar
        alt={'profile photo'}
        // src={avatar ? avatar : ''}
        src={''}
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
            <div>
              <ImagePlaceholder src={placeholder} alt={'placeholder'} width={320} height={340} />
              {error && <div className={`text-red-500 w-38`}>{error}</div>}
              <input
                type="file"
                accept="image/jpeg,image/png, image/jpeg"
                ref={fileInputRef}
                className={'hidden'}
                id="fileInput"
                onChange={handleFileSelect}
              />
              <GlobalButton type={'button'} className={`text-[16px]`} callback={onSelectClick}>
                Select from computer
              </GlobalButton>
            </div>
          )}
        </>
      </ModalWithContent>
    </div>
  )
}
