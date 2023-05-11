import React, { useRef } from 'react'

import { CropperRef, FixedCropper, ImageRestriction } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/themes/bubble.css'

import { CreatePostModal } from './../create-post-modal/CreatePostModal'

import { usePostStore } from '@/store'

type PropsType = {
  image: string | File | Blob | MediaSource
  isModalOpen: boolean
  setSelectedPhotos: (selectedPhotos: string | File | Blob | MediaSource) => void
  filterEditorModule: (isModalOpen: boolean) => void
  cropEditorModule: (isModalOpen: boolean) => void
  onClose: () => void
}

interface Image {
  type?: string
  src: string
}

export const CropEditor = ({
  image,
  setSelectedPhotos,
  isModalOpen,
  filterEditorModule,
  cropEditorModule,
  onClose,
}: PropsType) => {
  // const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  // const [zoom, setZoom] = useState(1)
  // const [aspect, setAspect] = useState<number>(4 / 5)
  const { setCroppedPhoto, imageUrl, setImageUrl, postPhotos } = usePostStore()
  //
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
  //   width: 0,
  //   height: 0,
  //   x: 0,
  //   y: 0,
  // })

  // const [croppedImage, setCropImg] = useState<string>('')
  // const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
  //   setCroppedAreaPixels(croppedAreaPixels)
  // }, [])
  //
  const onNextClick = () => {
    postPhotos.map(post => {
      debugger
      const { uploadId, croppedPhoto, cropSize } = post

      setCroppedPhoto(
        uploadId,
        croppedPhoto,
        cropSize
        // {
        // width: croppedAreaPixels.width,
        // height: croppedAreaPixels.height,
        // }
      )
    })
    cropEditorModule(false)
    filterEditorModule(true)
  }
  //
  // useEffect(() => {
  //   if (croppedAreaPixels) {
  //     getCroppedImg(imageUrl as string, croppedAreaPixels).then(croppedImage => {
  //       setSelectedPhotos(String(croppedImage))
  //       setCropImg(String(croppedImage))
  //     })
  //   }
  // }, [croppedAreaPixels])
  //
  // useEffect(() => {
  //   if (image instanceof File) {
  //     const objectUrl = URL.createObjectURL(image)
  //
  //     setImageUrl(objectUrl)
  //   }
  // }, [image])
  //
  // useEffect(() => {
  //   return () => {
  //     if (imageUrl) {
  //       URL.revokeObjectURL(String(imageUrl))
  //     }
  //   }
  // }, [imageUrl])

  const inputRef = useRef<HTMLInputElement>(null)

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas())
  }

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
                <FixedCropper
                  stencilSize={{
                    width: 280,
                    height: 280,
                  }}
                  imageRestriction={ImageRestriction.stencil}
                  src={URL.createObjectURL(image.selectedPhotos)}
                  onChange={onChange}
                  className={'cropper'}
                />
              </>
            )}
          </>
        ))}
      </div>
      <div className="flex gap-3 absolute bottom-3 left-3">
        {/*<CropPopup setAspect={setAspect} />*/}
        {/*<ZoomPopup zoom={zoom} setZoom={setZoom} />*/}
        {/*<PlusPhoto />*/}
      </div>
    </CreatePostModal>
  )
}
