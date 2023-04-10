import React, { FC, memo } from 'react'

import { LoginPage, RegisterPage } from '@/modules'
import TabComponent from '@/ui/tabs/GlobalTabs'

interface IFuture {}

const Future: FC<IFuture> = memo(({}) => {
  return (
    <div>
      <TabComponent
        tabComponent1={<LoginPage />}
        nameTab1={'General information'}
        tabComponent2={<RegisterPage />}
        nameTab2={'Devices'}
      />
    </div>
  )
})

// className={'flex flex-col text-danger-300 items-center mt-48 uppercase'}
export default Future
