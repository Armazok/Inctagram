import React from 'react'

import Image from 'next/image'

import { IPhoto } from '@/store/storeSelectorPhoto'

type PropsType = {
  imageSrc: IPhoto
  filter: string
  filterName: string
  onFilterClick: (filter: string) => void
}

export const PhotoFilterItem = ({
  imageSrc,
  filter = '',
  filterName,
  onFilterClick,
}: PropsType) => {
  const onFilterClickHandler = () => {
    onFilterClick(filter)
  }

  return (
    <div className={'flex flex-col items-center px-[15px] py-[5px]'} onClick={onFilterClickHandler}>
      <Image
        alt={`filter ${filter}`}
        src={String(imageSrc.filteredUrl)}
        style={{ filter: filter }}
        width={108}
        height={108}
      />
      <div className={'text-light-100 text-[16px] mt-[6px]'}>{filterName}</div>
    </div>
  )
}
