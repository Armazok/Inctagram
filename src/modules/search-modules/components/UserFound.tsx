import { useTranslation } from '@/components/translation'
import { Placeholder } from '@/ui'

export const UserFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col pt-7 gap-4">
      <span className="text-base font-bold leading-6 text-light-100">{t.search.recentRequests}</span>
      <div className="flex gap-3">
        <Placeholder
          className={'cursor-default object-cover rounded-full'}
          height={48}
          width={48}
          alt={'alt'}
          src={''}
        />
        <div className="flex flex-col text-light-100 text-sm leading-6 font-normal">
          <span className="underline hover:text-accent-500 transition-colors outline-none">
            Ekat_Ivanova
          </span>
          <span className="text-light-900">Ekaterina Ivanova</span>
        </div>
      </div>
    </div>
  )
}
