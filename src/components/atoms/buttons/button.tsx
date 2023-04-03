import { FC } from 'react'

import style from './button.module.scss'

interface IButton {
  textBtn: string
  tag?: string
  type: 'submit' | 'reset' | 'button'
  callback: () => void
}
const Button: FC<IButton> = ({ textBtn, tag, type, callback }) => {
  return (
    <button className={style.button} type={type} onClick={callback}>
      {textBtn}
    </button>
  )
}

export default Button
