import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './Radio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type RadioType = Omit<DefaultRadioPropsType, 'type'> & {
  callBack: (option: any) => void
}
export const Radio: React.FC<RadioType> = ({
  value,
  callBack,
  id,
  name,
  disabled,
  ...restProps
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.value)
  }

  return (
    <div>
      <input
        disabled={disabled}
        className={s.customRadio}
        id={id}
        onChange={onChange}
        type="radio"
        value={value}
        name={name}
        {...restProps}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  )
}
