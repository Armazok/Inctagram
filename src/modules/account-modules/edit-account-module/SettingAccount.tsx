import React, { useState } from 'react'

import TabsTitle from '@/components/account/tabs-title/TabsTitle'
import { tabs } from '@/modules/account-modules/edit-account-module/constants/tabs-data'

const SettingsAccount = () => {
  const [activeTab, setActiveTab] = useState(tabs && tabs[0].label)

  const tabsLayout = tabs.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  return (
    <div className="w-full ml-[200px] relative">
      <TabsTitle variant="edit" tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}

export default SettingsAccount
