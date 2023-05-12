import React, { useCallback, useEffect, useState } from 'react'

import Cropper, { Area, Point } from 'react-easy-crop'

import { CreatePostModal } from './../create-post-modal/CreatePostModal'

import { CropPopup } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/crop-popup'
import { PlusPhoto } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/plus-photo/plusPhoto'
import getCroppedImg from '@/modules/post-modules/create-post-module/components/photo-crop-editor/utils/canvasUtils'
import { ZoomPopup } from '@/modules/post-modules/create-post-module/components/photo-crop-editor/zoom-popup'
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const [croppedImage, setCropImg] = useState<string[]>([])

  console.log('croppedImage', croppedImage)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onNextClick = () => {
    postPhotos.map(post => {
      debugger
      const { uploadId } = post

      setCroppedPhoto(uploadId, croppedImage, {
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      })
    })
    cropEditorModule(false)
    filterEditorModule(true)
  }

  useEffect(() => {
    if (croppedAreaPixels) {
      getCroppedImg(imageUrl as string, croppedAreaPixels).then(croppedImage => {
        setSelectedPhotos(String(croppedImage))
        setCropImg([String(croppedImage)])
      })
    }
  }, [croppedAreaPixels])

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image)

      setImageUrl(objectUrl)
    }
  }, [image])

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(String(imageUrl))
      }
    }
  }, [imageUrl])

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
      <div className="relative h-[500px]">
        {postPhotos.map((image, idx) => (
          <>
            {image.selectedPhotos && typeof image.selectedPhotos !== 'string' && (
              <>
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
              </>
            )}
          </>
        ))}
      </div>
      <div className="flex gap-3 absolute bottom-3 left-3">
        <CropPopup setAspect={setAspect} />
        <ZoomPopup zoom={zoom} setZoom={setZoom} />
        <PlusPhoto />
      </div>
    </CreatePostModal>
  )
}
