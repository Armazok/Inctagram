import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import expandOutline from '@/assets/icons/expand-outline.svg'
import rectangle11 from '@/assets/icons/Rectangle11.svg'
import rectangle169 from '@/assets/icons/Rectangle169.svg'
import rectangle45 from '@/assets/icons/Rectangle45.svg'

type PropsType = {
  setAspect: (aspect: number) => void
}

export const CropPopup: FC<PropsType> = ({ setAspect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cropRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cropRef.current && !e.composedPath().includes(cropRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={cropRef}>
      <div
        onClick={() => setIsOpen(true)}
        className={'bg-dark-500 p-1 rounded-sm opacity-80 relative cursor-pointer'}
      >
        <Image src={expandOutline} alt={'zoom'} width={24} height={24} color={'blue'} />
      </div>
      {isOpen && (
        <div
          className={
            'absolute flex flex-col gap-2 bg-dark-500 p-3 rounded-sm opacity-80 -top-32 text-light-900 w-40'
          }
        >
          <div
            className={'flex justify-between items-center hover:text-light-100 cursor-pointer'}
            onClick={() => setAspect(1)}
          >
            1:1
            <Image src={rectangle11} alt={'rectangle11'} width={18} height={18} />
          </div>
          <div
            className={'flex justify-between items-center hover:text-light-100 cursor-pointer'}
            onClick={() => setAspect(4 / 5)}
          >
            4:5
            <Image src={rectangle45} alt={'rectangle45'} width={18} height={26} />
          </div>
          <div
            className={'flex justify-between items-center hover:text-light-100 cursor-pointer'}
            onClick={() => setAspect(16 / 9)}
          >
            16:9
            <Image src={rectangle169} alt={'rectangle169'} width={26} height={20} />
          </div>
        </div>
      )}
    </div>
  )
}
