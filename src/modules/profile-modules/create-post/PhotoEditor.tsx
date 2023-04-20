import React, { useCallback, useEffect, useState } from 'react'

import Cropper from 'react-easy-crop'
// eslint-disable-next-line import/no-unresolved
import { Point } from 'react-easy-crop/types'

import { getCroppedImg } from '@/modules/profile-modules/create-post/utils/canvasUtils'

type PropsType = {
  image: string | File | null
  setSelectedPhoto: (photo: string | File | null) => void
}

export const PhotoEditor = ({ image, setSelectedPhoto }): PropsType => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number>(4 / 5)
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onZoomChange = (event: any) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  const saveCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels)

      setSelectedPhoto(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    saveCropImage()
  }, [croppedAreaPixels])

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image)

    setImageUrl(objectUrl)
  }, [])

  return (
    image && (
      <>
        <div className={'relative h-[500px]'}>
          <Cropper
            image={String(imageUrl)}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomWithScroll={false}
          />
          <div className={'flex gap-3 absolute bottom-3 left-3 cursor-pointer'}>
            <div onClick={() => setAspect(1)}>1:1</div>
            <div onClick={() => setAspect(4 / 5)}>4:5</div>
            <div onClick={() => setAspect(16 / 9)}>16:9</div>
          </div>
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={zoom}
            onChange={onZoomChange}
            className={'absolute right-3 bottom-3'}
          />
        </div>
      </>
    )
  )
}
