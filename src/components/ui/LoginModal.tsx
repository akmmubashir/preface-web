'use client'

import SocialLogin from '@/components/auth/SocialLogin'
import { login } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { Dialog } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  cancelText?: string
  onLoginSuccess?: () => void
  redirectPath?: string
}

const LoginModal = ({
  isOpen,
  onClose,
  title = 'Welcome back',
  description = 'Sign in to your account to continue',
  cancelText = 'Cancel',
  onLoginSuccess,
  redirectPath = '/signup',
}: LoginModalProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess()
    }
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.emailOrUsername || !formData.password) return

    setIsLoading(true)
    try {
      console.log('Login attempt:', formData)

      await login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      })

      handleLoginSuccess()
      router.push('/')
    } catch (error: any) {
      console.error('Login error:', error)
      alert(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 dark:bg-neutral-900">
          <Dialog.Title className="text-center text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            {description}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <Field className="block">
              <Label className="text-[#868686] dark:text-[#B7B7B7]">Email or Username</Label>
              <Input
                type="text"
                placeholder="Enter your email or username"
                className="mt-1"
                value={formData.emailOrUsername}
                onChange={handleInputChange('emailOrUsername')}
                required
                disabled={isLoading}
              />
            </Field>

            <Field className="block">
              <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pr-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </Field>

            <Field className="block">
              <div className="flex items-center justify-end text-[#00652E] dark:text-[#60A43A]">
                <Link href="/forgot-password" className="text-sm font-medium underline hover:no-underline">
                  Forgot password?
                </Link>
              </div>
            </Field>

            <ButtonPrimary
              type="submit"
              color="primary"
              className="w-full"
              disabled={isLoading || !formData.emailOrUsername || !formData.password}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </ButtonPrimary>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-neutral-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-neutral-900 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialLogin />

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose()
                  router.push(redirectPath)
                }}
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Sign up
              </button>
            </p>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LoginModal
