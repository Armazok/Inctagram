import React, { useCallback, useEffect, useState } from 'react'

import Cropper, { Area } from 'react-easy-crop'
// eslint-disable-next-line import/no-unresolved
import { Point } from 'react-easy-crop/types'

import { CropPopup } from '@/modules/profile-modules/create-post/components/crop-popup'
import { ZoomPopup } from '@/modules/profile-modules/create-post/components/zoom-popup'
import getCroppedImg from '@/modules/profile-modules/create-post/utils/canvasUtils'

type PropsType = {
  image: string | File | null
  setSelectedPhoto: (photo: string | File | null) => void
  setCropSize: (crop: { width: number; height: number }) => void
}

export const PhotoEditor = ({ image, setSelectedPhoto, setCropSize }: PropsType) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number>(4 / 5)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    if (croppedAreaPixels) {
      getCroppedImg(imageUrl, croppedAreaPixels).then((croppedImage: string) =>
        setSelectedPhoto(croppedImage)
      )
      setCropSize({ width: croppedAreaPixels.width, height: croppedAreaPixels.height })
    }
  }, [croppedAreaPixels])

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image as File)

    setImageUrl(objectUrl)
  }, [])

  return (
    <>
      <div className={'relative h-[500px]'}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomWithScroll={false}
        />
        <div className={'flex gap-3 absolute bottom-3 left-3'}>
          <CropPopup setAspect={setAspect} />
          <ZoomPopup zoom={zoom} setZoom={setZoom} />
        </div>
      </div>
    </>
  )
}
