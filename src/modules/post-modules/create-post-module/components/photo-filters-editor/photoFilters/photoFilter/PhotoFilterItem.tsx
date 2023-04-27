import React from 'react'

import Image from 'next/image'

type PropsType = {
  imageSrc: string
  filter: string
  filterName: string
  onFilterClick: (filter: string) => void
}

export const PhotoFilterItem = ({
  imageSrc = '',
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
        src={imageSrc}
        style={{ filter: filter }}
        width={108}
        height={108}
      />
      <div className={'text-light-100 text-[16px] mt-[6px]'}>{filterName}</div>
    </div>
  )
}
