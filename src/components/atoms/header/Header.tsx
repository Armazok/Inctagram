import React from 'react'

import containerBlock from '../../../styles/container.module.scss'

import style from './Header.module.scss'

import Logout from '@/components/header/Logout/Logout'
import { useUserStore } from '@/store'

export const Header = () => {
  const { isLoggedIn } = useUserStore()

  return (
    <div className={containerBlock.container}>
      <header className={style.header}>
        <div className={style.title}>Inctagram</div>

        {isLoggedIn && <Logout />}
      </header>
    </div>
  )
}
