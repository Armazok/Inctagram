import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import facebook from '../../../public/icons/facebook-svgrepo.png'
import google from '../../../public/icons/google-svgrepo.png'
import containerBlock from '../../styles/container.module.scss'

import style from './pageRegistration.module.scss'

import Button from '@/components/atoms/buttons/button'

const PageRegistration = () => {
  return (
    <div className={`${containerBlock.container} ${style.registerBlock}`}>
      <div className={style.formContainer}>
        {/*<Heading style={style.title} tag={'h1'} text={'Sign Up'} />*/}
        <div className={style.iconContainer}>
          <Link href={'https://www.google.com/'} target="_blank">
            <Image src={facebook} width={36} height={36} alt={'googleIcon'} />
          </Link>
          <Link href={'https://www.facebook.com/'} target="_blank">
            <Image src={google} width={36} height={36} alt={'facebookIcon'} />
          </Link>
        </div>

        <form className={style.form}>
          <div className={style.inputContainer}>
            <label htmlFor={'email'} className={style.label}>
              Email
            </label>
            <input id={'email'} name={'email'} type={'text'} />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor={'password'} className={style.label}>
              Password
            </label>
            <input id={'password'} name={'password'} type={'password'} />
            <div className={style.showHidePassword}></div>
          </div>

          <div className={style.inputContainer}>
            <label htmlFor={'confirmPassword'} className={style.label}>
              Confirm password
            </label>
            <input id={'confirmPassword'} name={'confirmPassword'} type={'confirmPassword'} />
            {/*<div className={style.showHidePassword}></div>*/}
            <div className={style.forgotPassword}>
              <Link href={''}>Forgot Password</Link>
            </div>
          </div>
          <Button textBtn={'Sign In'} tag={'h3'} type={'submit'} callback={() => {}} />
          {/*<button>Sign In</button>*/}
        </form>
        <div className={style.desciptionAccount}>
          <Link href={''}>Don`t have an account?</Link>
        </div>
        <div>
          <Link href={''}>
            {/*<Heading style={style.desciptionSignIn} tag={'h3'} text={'Sign In'} />*/}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageRegistration
