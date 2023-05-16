import React, { ChangeEvent, useRef, useState } from 'react'

// eslint-disable-next-line import/no-duplicates
import Image from 'next/image'
// eslint-disable-next-line import/no-duplicates
import ImagePlaceholder from 'next/image'
// eslint-disable-next-line import/no-duplicates
import { v1 } from 'uuid'

import plusAdd from '@/assets/icons/plus-square.svg'
import placeholder from '@/assets/images/img-placeholder.png'
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'
import { GlobalButton } from '@/ui'

type PropsType = {
  cropEditorModule?: (isModalOpen: boolean) => void
  modalWithContent?: (isModalOpen: boolean) => void
  maxImageSize?: number
  showButton?: boolean
  placeholderShow?: boolean
  onAdd?: (photos: IPhoto[]) => void
}

export const PhotoSelector = ({
  cropEditorModule,
  modalWithContent,
  maxImageSize,
  showButton = true,
  placeholderShow = true,
  onAdd,
}: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const { setImageSelector } = useImageSelector()

  const checkImageSize = (file: File, maxImageSize: number, onSuccessSetFile: any, array: any) => {
    if (file.size <= maxImageSize * 1024 * 1024) {
      onSuccessSetFile(file, array)
    } else {
      setError(`Image size should not be more than ${maxImageSize} MB`)

      return
    }
  }

  const onSuccessAddFileToArray = (file: File, newImagesArray: IPhoto[]) => {
    const url = URL.createObjectURL(file)

    newImagesArray.push({ url, file, id: v1(), name: file.name, type: file.type, size: file.size })
  }

  const onFileSelectChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const newImages: IPhoto[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (maxImageSize) {
          checkImageSize(file, maxImageSize, onSuccessAddFileToArray, newImages)
        } else {
          onSuccessAddFileToArray(file, newImages)
        }
      }

      setImageSelector(newImages)
      if (onAdd && typeof onAdd === 'function') {
        onAdd(newImages)
      }
      if (cropEditorModule && modalWithContent) {
        cropEditorModule(true)
        modalWithContent(false)
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
        {placeholderShow && (
          <ImagePlaceholder src={placeholder} alt={'placeholder'} width={300} height={300} />
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png, image/jpeg"
        ref={fileInputRef}
        className={'hidden'}
        id="fileInput"
        onChange={onFileSelectChange}
        multiple
      />
      {showButton ? (
        <>
          <div className={'text-danger-700 mt-[20px]'}>{error}</div>
          <GlobalButton
            type={'button'}
            className={`text-[16px] my-[60px] mx-[60px] font-semibold`}
            callback={onSelectClick}
          >
            Select from computer
          </GlobalButton>
        </>
      ) : (
        <Image
          className={`text-[16px] my-[60px] mx-[60px] font-semibold`}
          onClick={onSelectClick}
          src={plusAdd}
          width={50}
          height={50}
          alt="add"
        />
      )}
    </div>
  )
}
