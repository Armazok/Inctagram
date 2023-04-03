import React, { FC, memo, useState } from 'react'

import style from './input.module.scss'

interface IInput {
  placeholder?: string
  id?: string
  typeInput: 'text' | 'password' | 'email'
  labelName?: string
  value?: string
  onChange?: (e: any) => void
}

export const Input: FC<IInput> = memo(
  ({ placeholder = '', id, typeInput, labelName = '', value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleShowPass = () => {
      setIsPasswordVisible(!isPasswordVisible)
    }

    // eslint-disable-next-line no-nested-ternary
    const inputType = typeInput === 'password' ? (isPasswordVisible ? 'text' : 'password') : 'text'
    const inputClass = typeInput === 'password' ? 'z-0' : 'z-10'
    const wrapperClass = typeInput === 'password' ? 'relative' : ''

    return (
      <div className={`w-auto ${wrapperClass}`}>
        <div className="flex flex-col">
          <label htmlFor={id} className={style.label}>
            {labelName}
          </label>
          <input
            id={id}
            autoComplete="off"
            type={inputType}
            className={`${inputClass} ${style.input}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          {typeInput === 'password' ? (
            <div onClick={handleShowPass} className={style.showHidePassword} />
          ) : null}
        </div>
      </div>
    )
  }
)
