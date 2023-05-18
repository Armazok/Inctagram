import { FC, useState } from 'react'

import { format } from 'date-fns'
import { UAParserInstance } from 'ua-parser-js'

import { Device } from '../api/devices-api'
import { BrowserIconSwitch } from '../components/BrowserIconSwitch'
import { useDeleteSession } from '../hooks/useDeleteSession'

import { Confirm } from '@/components/modals'
import { GlobalButton } from '@/ui'

type Props = {
  device: Device & UAParserInstance
}

export const OtherDevice: FC<Props> = ({ device }) => {
  const [isConfirmOpened, setIsConfirmOpened] = useState(false)
  const { mutate, isLoading } = useDeleteSession(device.deviceId)

  const onConfirm = () => {
    setIsConfirmOpened(false)
    mutate()
  }

  const onConfirmClose = () => {
    setIsConfirmOpened(false)
  }

  return (
    <div className="border-dark-100 border rounded-sm py-6 px-4 mt-3" key={device.deviceId}>
      <div className="grid gap-3 grid-cols-[36px_1fr_auto]">
        <div>
          <BrowserIconSwitch browser={device.getBrowser()} size={36} color={'#fff'} />
        </div>

        <div>
          <div className="text-base font-bold text-white">
            {`${device.getBrowser().name} (${device.getOS().name} ${device.getOS().version})`}
          </div>

          <div className="mt-3 text-sm text-white">ip: {device.ip}</div>

          <div className="mt-2 text-sm text-white font-medium">
            Last visit: {format(new Date(device.lastVisit), 'dd.MM.yyyy HH:mm:ss')}
          </div>
        </div>

        <div className="self-center">
          <GlobalButton
            callback={() => setIsConfirmOpened(true)}
            type={'button'}
            variant={'transparent'}
            disabled={isLoading}
          >
            Logout
          </GlobalButton>

          <Confirm
            isOpen={isConfirmOpened}
            onConfirm={onConfirm}
            onClose={onConfirmClose}
            title="Terminate Session?"
            text="Are you sure you want to terminate session?"
            declineButtonText="No"
            onDecline={onConfirmClose}
          />
        </div>
      </div>
    </div>
  )
}
