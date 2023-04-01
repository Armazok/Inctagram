import React from 'react'

import styleContainer from './container.module.scss'
import style from './register.module.scss'

export const Register = () => {
  return (
    <div className={`${style.formWrapper} ${styleContainer.container}`}>
      <div className={style.formContainer}>
        <h1 className={style.heading}>Sign Up</h1>
        <form className={style.form}>
          <div className={style.email}>
            <label htmlFor={'email'} className={style.label}>
              Email
            </label>
            <input id={'email'} name={'email'} type={'text'} />
          </div>

          <div className={style.password}>
            <label htmlFor={'password'} className={style.label}>
              Password
            </label>
            <input id={'password'} name={'password'} type={'password'} />
            <div className={style.showHidePassword}></div>
          </div>

          <div className={style.password}>
            <label htmlFor={'confirmPassword'} className={style.label}>
              Confirm password
            </label>
            <input id={'confirmPassword'} name={'confirmPassword'} type={'confirmPassword'} />
            <div className={style.showHidePassword}></div>
          </div>

          <button>Sign In</button>
        </form>
        <div className={style.account}>Don`t have an account?</div>
      </div>
    </div>
  )
}
