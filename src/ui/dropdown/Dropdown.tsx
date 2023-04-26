import { Dispatch, FC, PropsWithChildren, SetStateAction, useState } from 'react'

import { FaEllipsisH } from 'react-icons/fa'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const Dropdown: FC<PropsWithChildren<Props>> = ({ children, isOpen, setIsOpen }) => {
  return (
    <div className="relative">
      <button
        className="text-[16px] w-6 h-6 flex items-center justify-center text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <FaEllipsisH />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 bg-dark-500 border-dark-100 border py-1.5">
          {children}
        </div>
      )}
    </div>
  )
}
