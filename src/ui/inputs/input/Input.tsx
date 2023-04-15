import { CSSProperties, FC, ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react'

import { FieldValues } from 'react-hook-form'

import style from './Input.module.scss'
type InputType = {
  type: HTMLInputTypeAttribute
  ref?: ForwardedRef<any>
  id?: string
  label?: string
  placeholder?: string
  error?: string | FieldValues | any
  classNameContainer?: CSSProperties
  defaultValue?: string | any
}

export const GlobalInput: FC<InputType> = forwardRef(
  (
    {
      type,
      label = '',
      placeholder,
      id,
      error,
      classNameContainer = '',
      defaultValue,
      ...restProps
    },
    ref: ForwardedRef<any>
  ) => {
    return (
      <div className={`${style.container} ${classNameContainer}`}>
        <label htmlFor={id} className={`${style.label}`}>
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            className={error ? style.inputBottomError : ''}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={ref}
            {...restProps}
          />
          {error && <span className={style.error}>{error}</span>}
        </div>
      </div>
    )
  }
)
