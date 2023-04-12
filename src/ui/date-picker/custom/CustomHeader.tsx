import { format } from 'date-fns'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './customHeader.module.scss'

import { capitalizeFirstLetter } from '@/common/capitalize-first-letter/capitalizeFirstLetter'
import { KeyboardArrowLeft } from '@/ui/date-picker/custom/icon-components/KeyboardArrowLeft'
import { KeyboardArrowRight } from '@/ui/date-picker/custom/icon-components/KeyboardArrowRight'

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
