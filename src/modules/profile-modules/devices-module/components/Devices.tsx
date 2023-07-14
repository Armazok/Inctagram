import { FC, useState } from 'react'

import { Confirm } from '@/components/modals'
import { BrowserIconSwitch } from '@/modules/profile-modules/devices-module/components/BrowserIconSwitch'
import { OtherDevice } from '@/modules/profile-modules/devices-module/components/OtherDevice'
import { useDeleteSessions } from '@/modules/profile-modules/devices-module/hooks/useDeleteSessions'
import { useGetSessions } from '@/modules/profile-modules/devices-module/hooks/useGetSessions'
import { GlobalButton } from '@/ui'

export const Devices: FC = () => {
  const { sessions, isLoading, isError, isFetching } = useGetSessions()
  const [isConfirmOpened, setIsConfirmOpened] = useState(false)

  const { mutate: deleteSessions } = useDeleteSessions()

  const onConfirm = () => {
    deleteSessions()

    setIsConfirmOpened(false)
  }

  const onConfirmClose = () => {
    setIsConfirmOpened(false)
  }

  if (isLoading || isFetching) return <div className="text-white mt-8">Loading...</div>

  if (isError) return <>Error...</>

  const thisDevice = sessions?.devices.find(device => device.deviceId === sessions.currentDeviceId)
  const otherDevices = sessions?.devices.filter(
    device => device.deviceId !== sessions.currentDeviceId
  )

  return (
    <div className="mt-8">
      {thisDevice && (
        <div>
          <div className="text-white font-semibold">This devices</div>

          <div className="border-dark-100 border rounded-sm py-6 px-4 mt-2">
            <div className="grid gap-3 grid-cols-[36px_1fr]">
              <div>
                <BrowserIconSwitch browser={thisDevice.getBrowser()} size={36} color={'#fff'} />
              </div>

              <div>
                <div className="text-base font-bold text-white">
                  {`${thisDevice.getBrowser().name} (${thisDevice.getOS().name} ${
                    thisDevice.getOS().version
                  })`}
                </div>

                <div className="mt-3 text-sm text-white">ip: {thisDevice.ip}</div>

                <div className="mt-2 text-base text-accent-500 font-medium">Online</div>
              </div>
            </div>
          </div>

          {otherDevices && otherDevices.length && (
            <>
              <div className="mt-8 flex justify-end">
                <GlobalButton
                  callback={() => setIsConfirmOpened(true)}
                  type={'button'}
                  variant={'transparent'}
                >
                  Terminate all other session
                </GlobalButton>

                <Confirm
                  isOpen={isConfirmOpened}
                  onConfirm={onConfirm}
                  onClose={onConfirmClose}
                  title="Terminate all other session?"
                  text="Are you sure you want to terminate all other session?"
                  declineButtonText="No"
                  onDecline={onConfirmClose}
                />
              </div>

              <div className="mt-6 mb-4 text-white font-semibold">Active sessions</div>

              {otherDevices.map(device => (
                <OtherDevice device={device} key={device.deviceId} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
