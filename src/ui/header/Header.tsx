import React from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/modules/auth-modules/login-module/login/hooks/useLogin'
import { LogoutButton } from '@/modules/auth-modules/login-module/logout'

export const Header = () => {
  const { push } = useRouter()
  const { isSuccess } = useMeQuery()

  return (
    <header className="flex items-center w-full h-16 text-light-100 bg-bgColor border-b-[1px] border-b-bgLogBorder">
      <div className="px-[60px] flex justify-between w-full">
        <span className="cursor-pointer" onClick={() => push('/')}>
          Inctagram
        </span>

        <div>{isSuccess && <LogoutButton />}</div>
      </div>
    </header>
  )
}
