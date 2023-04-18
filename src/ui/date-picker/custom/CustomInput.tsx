import { forwardRef } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'

import { Calendar, Label } from '@/ui'
import s from '@/ui/date-picker/custom/customInput.module.scss'

type CustomInputProps = {
  label?: string
  error?: boolean
  isRange?: boolean
  disabledLabelText?: boolean
}

/**
 * CustomInput - для стилизации поля input
 * @param {boolean} isRange - определяет, будет ли увеличиваться ширина инпута для двух дат (true) или для одной (false)
 * @param {string} label - текст, отображаемый над input
 * @param {string} disabledLabelText - стиль шрифта для текста, отображаемого над input при блокировке формы
 * @param {boolean} error - определяет, будет ли input стилизован красным цветом при ошибке
 */
export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, disabledLabelText, isRange, ...rest }, ref) => {
    const classNames = {
      inputContainer: clsx(s.customInput, isRange && s.customInputForRange),
      iconContainer: s.iconContainer,
    }

    return (
      <Label label={label} disabledLabelText={disabledLabelText}>
        <div className={classNames.inputContainer}>
          <input ref={ref} {...rest} />
          <div className={classNames.iconContainer}>
            <Calendar error={error} />
          </div>
        </div>
      </Label>
    )
  }
)
