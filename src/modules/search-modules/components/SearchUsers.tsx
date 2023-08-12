import { ChangeEvent, useState } from 'react'

import { useDebounce } from 'usehooks-ts'

import { useTranslation } from '@/components/translation'
import { UserFound, useSearch } from '@/modules/search-modules'
import { InputSearch } from '@/ui'

export const SearchUsers = () => {
  const { search, setSearchInput, searchInput } = useSearch()
  const { t } = useTranslation()

  return (
    <div className="w-full flex pr-16">
      <div className="flex flex-col w-full">
        <h1 className={'text-light-100 font-bold pb-3'}>{t.search.searchTitle}</h1>
        <InputSearch
          className="h-9 w-full"
          placeholder={t.search.searchInput}
          value={searchInput}
          callBackSearch={setSearchInput}
        />
        <UserFound />
      </div>
    </div>
  )
}
