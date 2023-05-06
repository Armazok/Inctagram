import React from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/hookMe'

export const Header = () => {
  const { isSuccess } = useMeQuery()
  const { replace } = useRouter()

  const route = isSuccess ? '/profile' : '/auth/login'

  return (
    <header className="flex items-center w-full h-16 text-light-100 bg-bgColor border-b-[1px] border-b-bgLogBorder">
      <div className="px-[60px] flex justify-between w-full">
        <span
          className="cursor-pointer"
          onClick={() => replace(route, undefined, { shallow: true })}
        >
          Inctagram
        </span>
      </div>
    </header>
  )
}
