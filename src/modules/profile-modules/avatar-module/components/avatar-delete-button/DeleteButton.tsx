import React from 'react'

type PropsType = {
  onDeleteAvatarClick: () => void
}
export const DeleteAvatarButton = ({ onDeleteAvatarClick }: PropsType) => {
  return (
    <button
      className={
        'bg-danger-500 rounded-full w-4 h-4 text-[#fff] text-xs relative left-[70%] bottom-[195px] cursor-pointer'
      }
      onClick={onDeleteAvatarClick}
    >
      x
    </button>
  )
}
