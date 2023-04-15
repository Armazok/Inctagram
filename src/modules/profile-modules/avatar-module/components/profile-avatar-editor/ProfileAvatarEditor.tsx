import React, { useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import { GlobalButton } from '@/ui'

type PropsType = {
  image: string | File | null
  onSaveClick: (formData: any) => void
}

export const ProfileAvatarEditor = ({ image, onSaveClick }: PropsType) => {
  const [editor, setEditor] = useState(null)
  const [scale, setScale] = useState(1)

  const onScaleChange = (event: any) => {
    const scale = parseFloat(event.target.value)

    setScale(scale)
  }

  const onSaveClickHandler = async () => {
    if (editor) {
      //@ts-ignore
      const canvas = editor.getImage()

      canvas.toBlob((blob: string | Blob) => {
        const formData = new FormData()

        formData.append('file', blob)
        onSaveClick(formData)
      })
    }
  }

  return (
    <div>
      {image && (
        <div className={`flex flex-col items-center`}>
          <AvatarEditor
            style={{ width: '332px', height: '340px' }}
            ref={ref => {
              //@ts-ignore
              setEditor(ref)
            }}
            image={image}
            width={192}
            height={192}
            border={50}
            borderRadius={100}
            scale={scale}
            rotate={0}
          />
        </div>
      )}
      <div className={`flex flex-col items-end`}>
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scale}
          onChange={onScaleChange}
          className={`mt-[20px] bg-gray-700`}
        />
        <GlobalButton type="button" callback={onSaveClickHandler} className={`mt-[20px]`}>
          Save
        </GlobalButton>
      </div>
    </div>
  )
}
