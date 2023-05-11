import React, { useEffect, useState } from 'react'

import { settings_profile_tabs, useLocalStorage } from '@/common'
import { TabsTitle } from '@/components/account'

export const SettingsProfile = () => {
  const [storedTabsLabel, setStoredTabsLabel] = useLocalStorage(
    'setting_tabs',
    settings_profile_tabs[0].label
  )
  const [activeTab, setActiveTab] = useState('')

  const onChangeTab = (tabLabel: string | undefined) => {
    setActiveTab(tabLabel ?? '')

    setStoredTabsLabel(tabLabel ?? '')
  }

  const tabsLayout = settings_profile_tabs?.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  useEffect(() => {
    setStoredTabsLabel(storedTabsLabel)
    setActiveTab(storedTabsLabel)
  }, [])
  console.log('render')

  return (
    <div className="relative w-full">
      <TabsTitle tabs={settings_profile_tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
