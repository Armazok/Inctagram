import { format } from 'date-fns'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './customHeader.module.scss'

import { capitalizeFirstLetter } from '@/common'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@/ui'

/**
 * CustomHeader - компонент, используемый для отображения заголовка календаря
 * @param {Date} date - нужен для capitalizeFirstLetter, чтобы месяц был с большой буквы. Также можно передать option с локализацией языка
 * @param {function} decreaseMonth - функция, вызываемая при переключении на предыдущий месяц
 * @param {function} increaseMonth - функция, вызываемая при переключении на следующий месяц
 * @param {...any} rest - дополнительные параметры, принимаемые компонентом
 * @constructor
 */
export const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  ...rest
}: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL Y'))

  return (
    <div className={classNames.header} {...rest}>
      <div>{headerText}</div>
      <div className={classNames.buttonBox}>
        <button className={classNames.button} onClick={decreaseMonth}>
          <KeyboardArrowLeft />
        </button>

        <button className={classNames.button} onClick={increaseMonth}>
          <KeyboardArrowRight />
        </button>
      </div>
    </div>
  )
}
