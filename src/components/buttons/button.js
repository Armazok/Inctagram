import style from './button.module.scss'

import Heading from '@/components/Heading'

const Button = ({ text, tag }) => {
  return (
    <button className={style.button}>
      <Heading style={style.buttonTitle} tag={tag} text={text} />
    </button>
  )
}

export default Button
