import { useQuery } from '@tanstack/react-query'

import { useTranslation } from '@/components/translation'
import { UserFound, useSearch } from '@/modules/search-modules'
import { authInstance } from '@/services'
import { InputSearch } from '@/ui'
export interface GetUserFoundInterface {
  avatars: null
  createdAt: Date
  firstName: string | null
  id: number
  lastName: string | null
  userName: string | null
}

export const SearchUsers = () => {
  const { search, setSearchInput, searchInput } = useSearch()
  const { t } = useTranslation()

  console.log(search)
  const { data } = useQuery({
    // @ts-ignore
    queryKey: ['getUserFound'],
    queryFn: () =>
      authInstance.get(`users`, {
        params: {
          search: search,
        },
      }),
    forceFetch: true,
  })

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
        {data ? <UserFound userInfoFound={data.data.data} /> : 'notFound'}
      </div>
    </div>
  )
}
