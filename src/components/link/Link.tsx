import React from 'react'

import Link from 'next/link'

type PropsType = {
  title: string
  href: string
  className?: string
}

export default function({ title, href, className }: PropsType) {
  return (
    <Link href={href} className={className ? className : ''}>
      {title}
    </Link>
  )
}
