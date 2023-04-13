import React from 'react'

import { useRouter } from 'next/router'

import { LogoutButton } from '@/modules/auth-modules/login-module/logout'
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
        <div>{isLoggedIn && <LogoutButton />}</div>
      </div>
    </header>
  )
}
