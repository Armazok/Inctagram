import React, { FC, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import close from '@/assets/icons/close.svg'
import plusSquare from '@/assets/icons/plus-square-outline.svg'
import { PhotoSelector } from '@/modules/profile-modules/avatar-module'
import { usePostStore } from '@/store'

interface IPlusPhoto {}

export const PlusPhoto: FC<IPlusPhoto> = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setUploadId, setSelectedPhotos, postPhotos, setImageUrl, imageUrl } = usePostStore()
  const wrapperRef = useRef<HTMLDivElement>(null)

  console.log('postPhotos', postPhotos)
  console.log('imageUrl', imageUrl)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const onSetSelectedPhotoClick = (file: any) => {
    setSelectedPhotos(file)
    setUploadId(file)
  }

  function removePhotoByUploadId(uploadId: string) {
    usePostStore.setState(state => {
      state.postPhotos = state.postPhotos.filter(photo => photo.uploadId !== uploadId)
      state.imageUrl = ''
    })
  }

  return (
    <div ref={wrapperRef}>
      <div
        onClick={() => setIsOpen(true)}
        className={'bg-dark-500 p-1 rounded-sm opacity-80 relative cursor-pointer'}
      >
        <Image src={plusSquare} alt={'zoom'} width={24} height={24} color={'blue'} />
      </div>
      {isOpen && (
        <div
          className={
            'absolute flex flex-col gap-2 bg-dark-500 p-3 rounded-sm opacity-80 -top-64 -right-14 text-light-900 w-40'
          }
        >
          <div className={'flex justify-between items-center hover:text-light-100 cursor-pointer'}>
            <>
              {postPhotos.map((photo, index) => {
                if (photo.selectedPhotos instanceof Blob || photo.selectedPhotos instanceof File) {
                  return (
                    <>
                      <Image
                        key={photo.uploadId}
                        src={URL.createObjectURL(photo.selectedPhotos)}
                        alt={'img'}
                        width={50}
                        height={50}
                        color={'red'}
                        onClick={() =>
                          setImageUrl(URL.createObjectURL(photo.selectedPhotos as Blob))
                        }
                      />
                      <Image
                        src={close}
                        alt={'close'}
                        onClick={() => removePhotoByUploadId(photo.uploadId)}
                        width={150}
                        height={150}
                      />
                    </>
                  )
                }

                return null
              })}

              <PhotoSelector
                setSelectedPhoto={onSetSelectedPhotoClick}
                showButton={false}
                placeholderShow={false}
              />
            </>
          </div>
        </div>
      )}
    </div>
  )
}
