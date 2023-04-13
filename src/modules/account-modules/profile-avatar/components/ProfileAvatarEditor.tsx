import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import GlobalButton from '@/ui/buttons/GlobalButton'

type PropsType = {
  image: string | File | null
  setImage: (image: File | string) => void
  onSaveClick: (formData: any) => void
}

export const ProfileAvatarEditor = ({ image, setImage, onSaveClick }: PropsType) => {
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

      //for binary data
      // const blob = await new Promise(resolve => canvas.toBlob((blob: Blob) => resolve(blob)))
      // const arrayBuffer = await new Response(blob).arrayBuffer()
      // onSaveClick(arrayBuffer)

      canvas.toBlob((blob: string | Blob) => {
        const formData = new FormData()
        formData.append('file', blob)
        console.log(formData)
        onSaveClick(formData)
      })
    }
  }

  return (
    <div>
      {image && (
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
      )}
      <input type="range" min="1" max="2" step="0.01" value={scale} onChange={onScaleChange} />
      <GlobalButton type="button" callback={onSaveClickHandler}>
        Save
      </GlobalButton>
    </div>
  )
}
