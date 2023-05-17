import React, { FC, memo } from 'react'

import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'

interface IFiltersEditor {
  srs: IPhoto
  filterStyle: string
}

export const FilterImage: FC<IFiltersEditor> = memo(({ srs, filterStyle }) => {
  return (
    <div className={'flex justify-center'}>
      <img
        className={'max-h-[499px]'}
        src={String(srs.filteredUrl)}
        alt={srs.name}
        style={{ filter: filterStyle }}
        id={'image-filtered'}
      />
    </div>
  )
})
