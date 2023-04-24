import React from 'react'

export const RECAPTCHA_SITE_KEY = '6LcJfCYlAAAAAKFTOlLVPEGKwfzISAR2p7rD3Qew'

export const CaptchaScript = () => {
  return (
    <div>
      <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}></script>
    </div>
  )
}
