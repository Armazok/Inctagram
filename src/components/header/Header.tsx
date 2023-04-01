import React from 'react'

import style from './Header.module.scss'

export const Header = () => {
  return (
    <header className={style.header}>
      <div>Inctagram</div>
      <button className="uk-button uk-button-default">LINK</button>
    </header>
  )
}
