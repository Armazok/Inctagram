import React, { useCallback, useEffect, useState } from 'react'

import Cropper, { Area, Point } from 'react-easy-crop'

import { CreatePostModal } from './../create-post-modal/CreatePostModal'
import { CropPopup } from './crop-popup'
import getCroppedImg from './utils/canvasUtils'
import { ZoomPopup } from './zoom-popup'

import { usePostStore } from '@/store'

type PropsType = {
  image: string | File | null
  isModalOpen: boolean
  setSelectedPhoto: (photo: string | File | null) => void
  setCropSize: (crop: { width: number; height: number }) => void
  filterEditorModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
}

export const CropEditor = ({
  image,
  setSelectedPhoto,
  setCropSize,
  isModalOpen,
  filterEditorModule,
  cropEditorModule,
  onClose,
}: PropsType) => {
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

  const [croppedImage, setCropImg] = useState<string>('')
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const { setCroppedPhoto, postPhotos } = usePostStore()
  let uploadId = ''

  if (postPhotos[0]) {
    uploadId = postPhotos[0].uploadId
  }

  const onNextClick = () => {
    setCroppedPhoto(uploadId, croppedImage)
    cropEditorModule(false)
    filterEditorModule(true)
  }

  useEffect(() => {
    if (croppedAreaPixels) {
      getCroppedImg(imageUrl, croppedAreaPixels).then(croppedImage => {
        setSelectedPhoto(String(croppedImage))
        setCropImg(String(croppedImage))
      })
      setCropSize({ width: croppedAreaPixels.width, height: croppedAreaPixels.height })
    }
  }, [croppedAreaPixels])

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image as File)

    setImageUrl(objectUrl)
  }, [])

  return (
    <CreatePostModal
      showBackArrow={true}
      variant={'Next'}
      isOpen={isModalOpen}
      title={'Cropping'}
      onClose={onClose}
      onBackClick={onClose}
      onBtnClick={onNextClick}
    >
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
    </CreatePostModal>
  )
}
