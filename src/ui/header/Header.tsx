import React from 'react'

import { useRouter } from 'next/router'

import { Logout } from '@/components/header'
import { useUserStore } from '@/store'

export const Header = () => {
  const { push } = useRouter()
  const { isLoggedIn } = useUserStore()

  return (
    <header className="flex items-center w-full h-16 text-light-100 bg-bgColor border-b-[1px] border-b-bgLogBorder">
      <div className="px-[60px] flex justify-between w-full">
        <span className="cursor-pointer" onClick={() => push('/')}>
          Inctagram
        </span>
        <div>{isLoggedIn && <Logout />}</div>
      </div>
    </header>
  )
}
