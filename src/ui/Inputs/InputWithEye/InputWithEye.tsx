import React, { FC, forwardRef, useState } from 'react'
import GlobalInput from '@/ui/Inputs/Input/Input'
import style from './Input-with-eye.module.scss'
import eyeOutline from './../../../assets/icons/eye-outline-white.svg'
import eyeOff from './../../../assets/icons/eye-off-outline-white.svg'
import Image from 'next/image'

interface PropsType {
  id: string
  label: string
  placeholder: string
  error: string
}

const InputWithEye: FC<Partial<PropsType>> = forwardRef(
  ({ label, id, placeholder, error, ...restProps }, ref) => {
    const [showPass, setShowPass] = useState(false)

    return (
      <div className={style.container}>
        <GlobalInput
          type={showPass ? 'text' : 'password'}
          id={id ? id : ''}
          label={label ? label : ''}
          placeholder={placeholder ? placeholder : ''}
          error={error ? error : ''}
          ref={ref}
          {...restProps}
        />

        <button type="button" className={style.iconBtn} onClick={() => setShowPass(!showPass)}>
          <Image src={showPass ? eyeOff : eyeOutline} alt="Eye" height={24} width={24} />
        </button>
      </div>
    )
  }
)

export default InputWithEye
