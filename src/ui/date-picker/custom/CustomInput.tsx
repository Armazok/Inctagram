import { forwardRef } from 'react'

import clsx from 'clsx'

import s from '@/ui/date-picker/custom/customInput.module.scss'
import { Calendar } from '@/ui/date-picker/custom/icon-components/Calendar'
import { Label } from '@/ui/label/Label'

type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: boolean
  isRange?: boolean
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, disabled, error, isRange, ...rest }, ref) => {
    const classNames = {
      inputContainer: clsx(s.customInput, isRange && s.customInputForRange),
      iconContainer: s.iconContainer,
      label: clsx(disabled && 'text-dark-700'),
    }

    return (
      <Label label={label} className={classNames.label}>
        <div className={classNames.inputContainer}>
          <input ref={ref} disabled={disabled} {...rest} />
          <div className={classNames.iconContainer}>
            <Calendar error={error} />
          </div>
        </div>
      </Label>
    )
  }
)
