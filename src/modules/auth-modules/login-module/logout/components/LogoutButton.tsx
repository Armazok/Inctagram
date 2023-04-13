import { FC, useState } from 'react'

import { useRouter } from 'next/router'

import styles from '@/components/atoms/header/Header.module.scss'
import { Confirm } from '@/components/modals/confirm/Confirm'
import { useLogoutMutation } from '@/modules/auth-modules/login-module/logout/hooks/useLogout'
import { useUserStore } from '@/store'

export const LogoutButton: FC = () => {
  const router = useRouter()
  const { logout, email } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirm = () => {
    sendLogout()
  }

  const onDecline = () => {
    setIsModalOpen(false)
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    window.localStorage.removeItem('accessToken')
    setIsModalOpen(false)

    router.push('/auth/login')
  }

  const { sendLogout } = useLogoutMutation(handleLogout)

  return (
    <div className={styles.logout}>
      <button onClick={() => setIsModalOpen(true)}>Logout</button>

      <Confirm
        isOpen={isModalOpen}
        onConfirm={onConfirm}
        onDecline={onDecline}
        onClose={onClose}
        title="Log Out"
        text={`Are you really want to log out of your account "${email}"?`}
      />
    </div>
  )
}
