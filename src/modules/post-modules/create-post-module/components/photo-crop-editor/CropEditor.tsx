import React, { useCallback, useEffect, useState } from 'react'

import Cropper, { Area, Point } from 'react-easy-crop'

import { CreatePostModal } from './../create-post-modal/CreatePostModal'
import { CropPopup } from './crop-popup'
import getCroppedImg from './utils/canvasUtils'
import { ZoomPopup } from './zoom-popup'

import { PlusPhoto } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/plus-photo/plusPhoto'
import { PhotoUploader } from '@/modules/post-modules/create-post-module/components/photo-uploader/PhotoUploader'
import { usePostStore } from '@/store'

type PropsType = {
  image: string | File | Blob | MediaSource
  isModalOpen: boolean
  setSelectedPhotos: (selectedPhotos: string | File | Blob | MediaSource) => void
  filterEditorModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
}

export const CropEditor = ({
  image,
  setSelectedPhotos,
  isModalOpen,
  filterEditorModule,
  cropEditorModule,
  onClose,
}: PropsType) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number>(4 / 5)
  const { setCroppedPhoto, imageUrl, setImageUrl, postPhotos } = usePostStore()

  // const [imageUrl, setImageUrl] = useState<string>('')

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

  let uploadId = ''

  if (postPhotos[0]) {
    uploadId = postPhotos[0].uploadId
  }

  const onNextClick = () => {
    setCroppedPhoto(uploadId, croppedImage, {
      width: croppedAreaPixels.width,
      height: croppedAreaPixels.height,
    })
    cropEditorModule(false)
    filterEditorModule(true)
  }

  useEffect(() => {
    if (croppedAreaPixels) {
      getCroppedImg(imageUrl as string, croppedAreaPixels).then(croppedImage => {
        setSelectedPhotos(String(croppedImage))
        setCropImg(String(croppedImage))
      })
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
          image={String(imageUrl)}
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
          <PlusPhoto />
        </div>
      </div>
    </CreatePostModal>
  )
}
