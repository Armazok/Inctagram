import React, { FC, ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react'

import { FieldValues } from 'react-hook-form'

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  textAreaClassName?: string
  error?: string | FieldValues | any
  ref?: ForwardedRef<any>
}

export const Textarea: FC<ITextarea> = forwardRef(
  (
    { value, label, onChange, error, rows = 3, cols = 30, textAreaClassName, ...restProps },
    ref: ForwardedRef<any>
  ) => {
    return (
      <div>
        {label && (
          <label className={'block pb-[5px] text-light-900 text-[14px] text-weight-400'}>
            {label}
          </label>
        )}

        <textarea
          className={`py-[6px] px-[12px] border-light-900 border-[1px] bg-bgLogBorder rounded-[2px] text-light-900 text-[16px] text-weight-400 ${textAreaClassName}`}
          onChange={onChange}
          value={value}
          rows={rows}
          cols={cols}
          {...restProps}
          ref={ref}
        />

        <div className={'h-6'}>
          <span className={'text-danger-500 text-[14px] text-weight-400'}>
            {error ? error : ''}
          </span>
        </div>
      </div>
    )
  }
)
