import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { FaSignOutAlt } from 'react-icons/fa'

import styles from '@/components/atoms/header/Header.module.scss'
import { Confirm } from '@/components/modals/confirm/Confirm'
import { useMeQuery } from '@/modules/auth-modules/login-module/login/hooks/useLogin'
import { useLogoutMutation } from '@/modules/auth-modules/login-module/logout/hooks/useLogout'

export const LogoutButton: FC = () => {
  const router = useRouter()
  const { data, isError, isLoading } = useMeQuery()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirmModal = () => {
    sendLogout()
  }

  const onDeclineModal = () => {
    setIsModalOpen(false)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    setIsModalOpen(false)

    router.push('/auth/login')
  }

  const { sendLogout } = useLogoutMutation(handleLogout)

  if (isLoading || isError || !data) return null

  return (
    <div className={styles.logout}>
      <button onClick={() => setIsModalOpen(true)} className="flex items-center">
        <FaSignOutAlt className="mr-4" />
        Logout
      </button>

      <Confirm
        isOpen={isModalOpen}
        onConfirm={onConfirmModal}
        onDecline={onDeclineModal}
        onClose={onCloseModal}
        title="Log Out"
        text={`Are you really want to log out of your account "${data.data?.email}"?`}
      />
    </div>
  )
}