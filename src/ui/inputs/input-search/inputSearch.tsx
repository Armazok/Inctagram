import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { twMerge } from 'tailwind-merge'

import { IconInputSearch } from '@/ui'

interface InputSearchInterface {
  value: string
  callBackSearch: Dispatch<SetStateAction<string>>
  placeholder: string
  className?: string
}

export const InputSearch = ({
  value,
  callBackSearch,
  placeholder,
  className,
}: InputSearchInterface) => {
  return (
    <div className="relative">
      <input
        className={twMerge(
          'h-9 bg-transparent font-normal rounded-sm text-light-900 text-sm outline-none border border-dark-100 px-10',
          className
        )}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => callBackSearch(e.currentTarget.value)}
      />
      <div className="absolute bottom-2 top-2 left-3">
        <IconInputSearch />
      </div>
    </div>
  )
}
