import { useRef } from 'react'

// eslint-disable-next-line import/no-duplicates
import Image from 'next/image'
// eslint-disable-next-line import/no-duplicates
import ImagePlaceholder from 'next/image'

import plusAdd from '@/assets/icons/plus-square.svg'
import placeholder from '@/assets/images/img-placeholder.png'
import { GlobalButton } from '@/ui'

type PropsType = {
  setSelectedPhoto: (file: File) => void
  cropEditorModule?: (isModalOpen: boolean) => void
  modalWithContent?: (isModalOpen: boolean) => void
  showButton?: boolean
  placeholderShow?: boolean
}

export const PhotoSelector = ({
  setSelectedPhoto,
  cropEditorModule,
  modalWithContent,
  showButton = true,
  placeholderShow = true,
}: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileSelectChange = (event: any) => {
    const files = event.target.files

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        setSelectedPhoto(file)
        if (cropEditorModule && modalWithContent) {
          cropEditorModule(true)
          modalWithContent(false)
        }
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
        <GlobalButton
          type={'button'}
          className={`text-[16px] my-[60px] mx-[60px] font-semibold`}
          callback={onSelectClick}
        >
          Select from computer
        </GlobalButton>
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
