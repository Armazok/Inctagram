import { RECAPTCHA_SITE_KEY } from '@/modules/auth-modules/password-recovery-module/components/forgot-password/forgot-password-form/reCaptcha/CaptchaScript'

export const getCaptcha = (callback: any): any => {
  //@ts-ignore
  grecaptcha.ready(function () {
    //@ts-ignore
    grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(function (recaptcha) {
      callback(recaptcha)
    })
  })
}
