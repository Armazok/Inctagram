import React, { useRef } from 'react'

import { Avatar } from '@/ui/avatar/Avatar'
import GlobalButton from '@/ui/buttons/GlobalButton'

export const UploadAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onAddPhotoClick = () => {}
  const onPhotoChange = () => {}

  return (
    <div className={'flex flex-col flex-nowrap items-center w-52 font-medium p-[5px]'}>
      <Avatar alt={'profile photo'} src={''} className={`mb-[30px] mt-[48px]`} />
      {/*<form onSubmit={handleSubmit}></form>*/}
      <input
        accept="image/png, image/jpg, image/jpeg"
        name={'avatar'}
        className={'hidden'}
        type={'file'}
        onChange={onPhotoChange}
        ref={fileInputRef}
      />
      <GlobalButton
        type={'button'}
        variant={'transparent'}
        className={`text-[16px]`}
        callback={onAddPhotoClick}
      >
        Add a Profile Photo
      </GlobalButton>
    </div>
  )
}
