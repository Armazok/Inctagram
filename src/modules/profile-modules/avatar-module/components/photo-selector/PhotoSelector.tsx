import React, { useRef } from 'react'
import GlobalButton from '@/ui/buttons/GlobalButton'
import ImagePlaceholder from 'next/image'
import placeholder from '@/assets/images/img-placeholder.png'

type PropsType = {
  setSelectedPhoto: (file: File) => void
}

export const PhotoSelector = ({ setSelectedPhoto }: PropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileSelectChange = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0]
      setSelectedPhoto(file)
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
