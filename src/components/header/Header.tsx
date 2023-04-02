import React from 'react'
import style from './Header.module.scss'
import containerBlock from '../../styles/container.module.scss'

export const Header = () => {
    return (
        <div className={containerBlock.container}>
            <header className={style.header}>
                <div className={style.title}>Inctagram</div>
            </header>
        </div>
    )
}
