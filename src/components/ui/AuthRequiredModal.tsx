'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import { useState } from 'react'
import LoginModal from './LoginModal'

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  actionText?: string
  cancelText?: string
  redirectPath?: string
  onLoginSuccess?: () => void
}

const AuthRequiredModal = ({
  isOpen,
  onClose,
  title = 'Sign In Required',
  description = 'You need to be signed in to perform this action.',
  actionText = 'Sign In',
  cancelText = 'Cancel',
  redirectPath = '/login',
  onLoginSuccess,
}: AuthRequiredModalProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAction = () => {
    setShowLoginModal(true)
  }

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess()
    }
    onClose()
    setShowLoginModal(false)
  }

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        redirectPath={redirectPath}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={onClose} />
          <div className="relative mx-auto w-full max-w-sm rounded-xl bg-white p-6 dark:bg-neutral-900">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>

            <div className="mt-6 flex justify-end space-x-3">
              <ButtonPrimary onClick={onClose}>{cancelText}</ButtonPrimary>
              <ButtonPrimary onClick={handleAction}>{actionText}</ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthRequiredModal
