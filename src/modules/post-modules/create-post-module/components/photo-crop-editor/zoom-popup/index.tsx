import React, { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import maximize from '@/assets/icons/maximize.svg'

type PropsType = {
  zoom?: number
  setZoom: (zoom: number) => void
}

export const ZoomPopup: FC<PropsType> = ({ zoom, setZoom }) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={zoomRef}>
      <div
        onClick={() => setIsOpen(true)}
        className={'bg-dark-500 p-1 rounded-sm opacity-80 relative cursor-pointer'}
      >
        <Image src={maximize} alt={'zoom'} width={24} height={24} />
      </div>

      {isOpen && (
        <div className={'absolute bg-dark-500 p-2 pt-3 rounded-sm opacity-80 -top-14 left-11'}>
          <input
            className={'cursor-pointer'}
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={onZoomChange}
          />
        </div>
      )}
    </div>
  )
}
