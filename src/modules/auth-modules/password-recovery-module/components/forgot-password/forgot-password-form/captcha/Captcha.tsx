import React from 'react'

// @ts-ignore
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha-enterprise'

const RECAPTCHA_SITE_KEY = '6LcQ0LIlAAAAAIrqzrSIRNmk9Fnexi2g4bNPtZpX'

type PropsType = {
  onRecaptchaChangeHandler: (token: string) => void
}
export const Captcha = ({ onRecaptchaChangeHandler }: PropsType) => {
  const onRecaptchaChange = (token: string) => {
    onRecaptchaChangeHandler(token)
  }

  return (
    <div className={'my-[20px]'}>
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} theme={'dark'} />

      <div className={'pt-[18px] pb-[12px] text-[12px] leading-[24px] text-light-900 font-normal'}>
        <span>This site is protected by reCAPTCHA Enterprise and the Google</span>
        <a href="https://policies.google.com/privacy" className={'underline'}>
          {' '}
          Privacy Policy
        </a>
        <a href="https://policies.google.com/terms" className={'underline'}>
          {' '}
          Terms of Service
        </a>
      </div>
    </div>
  )
}
