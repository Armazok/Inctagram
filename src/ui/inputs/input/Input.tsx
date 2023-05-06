import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react'

import { FieldValues } from 'react-hook-form'

import style from './Input.module.scss'

export type InputType = InputHTMLAttributes<HTMLInputElement> & {
  type: HTMLInputTypeAttribute
  id?: string
  label?: string
  error?: string | FieldValues | any
  classNameContainer?: string | CSSProperties
}

export const GlobalInput = forwardRef(
  (
    { type, label = '', id, error, classNameContainer = '', ...restProps }: InputType,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
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
            autoComplete={type === 'email' ? 'on' : 'off'}
            {...restProps}
            ref={ref}
          />
          {error && <span className={style.error}>{error}</span>}
        </div>
      </div>
    )
  }
)
