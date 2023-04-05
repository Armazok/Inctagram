import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import facebook from '@/assets/icons/facebook-svgrepo.png'
import google from '@/assets/icons/google-svgrepo.png'

const GoogleFacebook = () => {
  return (
    <div className="flex gap-[60px] items-center">
      <Link href="https://www.google.com/" target="_blank">
        <Image src={facebook} width={36} height={36} alt={'googleIcon'} />
      </Link>
      <Link href="https://www.facebook.com/" target="_blank">
        <Image src={google} width={36} height={36} alt={'facebookIcon'} />
      </Link>
    </div>
  )
}

export default GoogleFacebook