import React, { useState } from 'react'

import { Area } from 'react-easy-crop/types'

import { PhotoFilters } from '@/modules/post-modules/create-post-module/components/photoFilters/PhotoFilters'
import getCroppedImg from '@/modules/profile-modules/create-post/utils/canvasUtils'

type PropsType = {
  imageUrl: string
  setFilteredImage: (filteredPhoto: any) => void
  croppedAreaPixels: Area | null
}

export const FiltersEditor = ({ setFilteredImage, imageUrl, croppedAreaPixels }: PropsType) => {
  const [filter, setFilter] = useState('none')

  const onFilterClick = async (filter: string) => {
    setFilter(filter)
    const filteredImage = await getCroppedImg(imageUrl, croppedAreaPixels as Area, filter)

    setFilteredImage(String(filteredImage))

    // const canvas = document.createElement('canvas')
    // const ctx = canvas.getContext('2d')
    // let image = document.getElementById('image-filtered')
    //
    // if (!ctx || !image) {
    //   return null
    // }
    //
    // ctx.filter = filter
    // ctx.drawImage(image, 0, 0)

    // canvas.toBlob((blob: string | Blob) => {
    //   const formData = new FormData()
    //   formData.append('file', blob)
    // //sendPost(formData)
    // })

    // canvas.toBlob(blob => {
    // const filteredImageUrl = URL.createObjectURL(blob)
    // setFilteredImage(filteredImageUrl)
    // }, 'image/jpeg')
  }

  return (
    <div className={'flex flex-wrap'}>
      <div className={`w-[436px]`}>
        <img src={imageUrl} alt="photo" style={{ filter: filter }} id={'image-filtered'} />
      </div>
      <PhotoFilters imageSrc={imageUrl} setFilter={onFilterClick} />
    </div>
  )
}
