import React, { useRef, useState } from 'react'

import ImagePlaceholder from 'next/image'

import placeholder from '@/assets/images/img-placeholder.png'
import { GlobalButton } from '@/ui'

type PropsType = {
  setSelectedPhoto: (file: File) => void
  cropEditorModule?: (isModalOpen: boolean) => void
  modalWithContent?: (isModalOpen: boolean) => void
  maxImageSize?: number
}

export const PhotoSelector = ({
  setSelectedPhoto,
  cropEditorModule,
  modalWithContent,
  maxImageSize,
}: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const checkImageSize = (file: File, maxImageSize: number, onSuccessSetFile: any) => {
    if (file.size <= maxImageSize * 1024 * 1024) {
      onSuccessSetFile(file)
    } else {
      setError(`Image size should not be more than ${maxImageSize} MB`)
    }
  }

  const onSuccessSetFile = (file: File) => {
    setSelectedPhoto(file)
    if (cropEditorModule && modalWithContent) {
      cropEditorModule(true)
      modalWithContent(false)
    }
  }

  const onFileSelectChange = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]

      if (maxImageSize) {
        checkImageSize(file, maxImageSize, onSuccessSetFile)
      } else {
        onSuccessSetFile(file)
      }
    }
  }

  const onSelectClick = () => {
    //@ts-ignore
    document.getElementById('fileInput').click()
  }

  return (
    <div className={'flex flex-col items-center'}>
      <div>
        <ImagePlaceholder src={placeholder} alt={'placeholder'} width={300} height={300} />
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png, image/jpeg"
        ref={fileInputRef}
        className={'hidden'}
        id="fileInput"
        onChange={onFileSelectChange}
      />
      <div className={'text-danger-700 mt-[20px]'}>{error}</div>
      <GlobalButton
        type={'button'}
        className={`text-[16px] my-[60px] mx-[60px] font-semibold`}
        callback={onSelectClick}
      >
        Select from computer
      </GlobalButton>
    </div>
  )
}
