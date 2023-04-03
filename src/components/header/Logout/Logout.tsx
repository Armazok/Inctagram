import { FC, useState } from 'react'

import { useRouter } from 'next/router'

import styles from '@/components/atoms/header/Header.module.scss'
import { Confirm } from '@/components/modals/confirm/Confirm'
import { useUserStore } from '@/store'

const Logout: FC = () => {
  const router = useRouter()
  const { logout, email } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirm = () => {
    logout()

    router.push('/auth/login')
  }

  const onDecline = () => {
    setIsModalOpen(false)
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

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

export default Logout
