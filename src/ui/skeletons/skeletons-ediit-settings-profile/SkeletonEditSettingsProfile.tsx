import React from 'react'

import { DateCalendar, GlobalButton, GlobalInput, Textarea } from '@/ui'
import { Skeleton } from '@/ui/skeletons/Skeleton'

export const SkeletonEditSettingsProfile = () => {
  return (
    <>
      <div className={'sm:flex sm:justify-center'}>
        <Skeleton classes={'mb-[30px] mt-[48px] rounded-full w-[192px] h-[192px] sm:m-0'} />
        <Skeleton
          classes={'rounded-full text-[16px] w-[198px] h-[38px] sm:w-80 sm:h-12 sm:items-center'}
        />
      </div>
      <div className="flex flex-col w-full max-h-max gap-[22px]">
        <Skeleton classes={'w-full rounded-full h-8'} />
        <Skeleton classes={'w-full rounded-full h-8'} />
        <Skeleton classes={'w-full rounded-full h-8'} />

        <Skeleton classes={'w-40 rounded-full h-9'} />

        <Skeleton classes={'w-full rounded-full h-8'} />

        <Skeleton classes={'w-full rounded-full h-14'} />

        <Skeleton
          classes={
            'rounded-full ml-auto mt-[30px] w-[158px] h-[36px] text-[16px] sm:w-full sm:mt-0 sm:h-12 sm:items-center'
          }
        />
      </div>
    </>
  )
}
