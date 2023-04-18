import React, { forwardRef, ForwardedRef } from 'react'

import { clsx } from 'clsx'

import { Calendar, Label } from '@/ui'
import s from '@/ui/date-picker/custom/customInput.module.scss'

type CustomInputProps = {
  label?: string
  errorMessage?: string
  isRange?: boolean
  disabledLabelText?: boolean
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { label, errorMessage, disabledLabelText, isRange, ...rest }: CustomInputProps,
    forwardedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const classNames = {
      inputContainer: clsx(s.customInput, isRange && s.customInputForRange),
      iconContainer: s.iconContainer,
    }

    return (
      <Label label={label} disabledLabelText={disabledLabelText}>
        <div className={classNames.inputContainer}>
          <input ref={forwardedRef} {...rest} />
          <div className={classNames.iconContainer}>
            <Calendar errorMessage={errorMessage} />
          </div>
        </div>
      </Label>
    )
  }
)
