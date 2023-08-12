import React, { FC, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { FaChevronDown } from 'react-icons/fa6'

import styles from './LanguageSwitcher.module.scss'

import en from '@/assets/icons/flags/en.png'
import ru from '@/assets/icons/flags/ru.png'
import ukraine from '@/assets/icons/flags/ukraine.png'

interface Language {
  slug: string
  name: string
  flag: StaticImageData
}

const languages: Language[] = [
  { slug: 'en', name: 'English', flag: en },
  { slug: 'uk', name: 'Українська', flag: ukraine },
  { slug: 'ru', name: 'Русский', flag: ru },
]

export const LanguageSwitcher: FC = () => {
  const { locale, push, pathname, query, asPath } = useRouter()
  const currentLanguage = languages.find(lang => lang.slug === locale)
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const onSelectLanguage = (locale: string) => {
    push({ pathname, query }, asPath, { locale: locale })
  }

  return (
    <>
      <DropdownMenu.Root modal={false} onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger className={'z-40'} asChild>
          <button className={styles.DropDownMenuTrigger}>
            <div className={styles.DropDownMenuFlag}>
              <Image src={currentLanguage!.flag} alt={currentLanguage!.name} />
            </div>

            {currentLanguage!.name}

            <FaChevronDown
              color="#fff"
              size={16}
              className={clsx('ml-auto', { 'rotate-180': isOpen })}
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={'bottom'}
            align={'start'}
            sideOffset={-1}
            className={styles.DropDownMenuContent}
          >
            {languages.map(lang => (
              <DropdownMenu.Item
                className={styles.DropDownMenuItem}
                onSelect={() => onSelectLanguage(lang.slug)}
                key={lang.slug}
              >
                <div className={styles.DropDownMenuFlag}>
                  <Image src={lang.flag} alt={lang.name} />
                </div>
                {lang.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}
