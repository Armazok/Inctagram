import { forwardRef } from 'react'

import clsx from 'clsx'

import { Calendar, Label } from '@/ui'
import s from '@/ui/date-picker/custom/customInput.module.scss'

type CustomInputProps = {
  label?: string
  error?: boolean
  isRange?: boolean
  disabledLabelText?: boolean
}

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
