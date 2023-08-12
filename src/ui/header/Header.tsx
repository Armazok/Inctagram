import React from 'react'

import { useRouter } from 'next/router'

import { Container } from '@/components/container'
import { LanguageSwitcher } from '@/components/translation'
import { useMeQuery } from '@/services/hookMe'

export const Header = () => {
  const { isSuccess } = useMeQuery()
  const { replace } = useRouter()

  const route = isSuccess ? '/profile' : '/auth/login'

  return (
    <header className="h-[60px] flex items-center text-white bg-dark-700 border-b border-dark-100">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <span className="block" onClick={() => replace(route, undefined, { shallow: true })}>
              Inctagram
            </span>
          </div>
          <LanguageSwitcher />
        </div>
      </Container>
    </header>
  )
}
