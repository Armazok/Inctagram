import React from 'react'

import Link from 'next/link'

import style from './Header.module.css'

const Header = ({}) => {
  return (
    <header className={style.header}>
      <img src="../../assets/logoHeader.png" alt="" />
      <Link href={'auth/login'}>Login</Link>
      <Link href={'auth/register'}>Register</Link>
      <Link href={'auth/forgotPass'}>forgotPass</Link>
    </header>
  )
}

export default Header
