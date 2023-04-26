import React, { useState } from 'react'

import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photoFilters/PhotoFilters'

type PropsType = {
  canvasWidth: number
  canvasHeight: number
  imageUrl: string
  setFilteredImage: (filteredPhoto: any) => void
}

export const FiltersEditor = ({
  setFilteredImage,
  imageUrl,
  canvasHeight,
  canvasWidth,
}: PropsType) => {
  const [filter, setFilter] = useState('none')

  const onFilterClick = async (filter: string) => {
    setFilter(filter)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let image = document.getElementById('image-filtered')

    if (!ctx || !image) {
      return null
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx.filter = filter
    //@ts-ignore
    ctx.drawImage(image, 0, 0)

    canvas.toBlob((blob: string | Blob | null) => {
      const formData = new FormData()

      formData.append('file', blob as Blob)
      setFilteredImage(formData)
    })

    // canvas.toBlob(blob => {
    //   //@ts-ignore
    //   const filteredImageUrl = URL.createObjectURL(blob)
    //
    //   setFilteredImage(String(filteredImageUrl))
    // })
  }

  return (
    <div className={'flex flex-wrap'}>
      <div className={`w-[436px]`}>
        <img
          src={imageUrl}
          alt="photo"
          style={{
            filter: filter,
            width: '434px',
          }}
          id={'image-filtered'}
        />
      </div>
      <PhotoFilters imageSrc={imageUrl} setFilter={onFilterClick} />
    </div>
  )
}
