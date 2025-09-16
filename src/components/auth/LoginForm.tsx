'use client'

import { login } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface LoginFormProps {
  className?: string
}

export default function LoginForm({ className = '' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.emailOrUsername || !formData.password) return

    setIsLoading(true)
    try {
      console.log('Login attempt:', formData)

      // Call the login API
      await login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      })

      // Redirect to home page on successful login
      router.push('/')
    } catch (error: any) {
      console.error('Login error:', error)
      // You can add error handling here (e.g., show toast notification)
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
    // <form
    //   className={`grid grid-cols-1 gap-6 ${className}`}
    //   onSubmit={handleSubmit}
    // >
    //   <Field className="block">
    //     <Label className="text-[#868686] dark:text-[#B7B7B7]">
    //       Email or Mobile Number
    //     </Label>
    //     <Input
    //       type="email"
    //       placeholder="Enter your email"
    //       className="mt-1"
    //       value={formData.email}
    //       onChange={handleInputChange('email')}
    //       required
    //       disabled={isLoading}
    //     />
    //   </Field>

    // <Field className="block">
    //   <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
    //     Password
    //   </Label>
    //   <div className="relative mt-1">
    //     <Input
    //       type={showPassword ? 'text' : 'password'}
    //       className="pr-10"
    //       placeholder="Enter your password"
    //       value={formData.password}
    //       onChange={handleInputChange('password')}
    //       required
    //       disabled={isLoading}
    //     />
    //     <button
    //       type="button"
    //       onClick={() => setShowPassword(prev => !prev)}
    //       className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    //       aria-label={showPassword ? 'Hide password' : 'Show password'}
    //       disabled={isLoading}
    //     >
    //       {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
    //     </button>
    //   </div>
    // </Field>

    //   <Field className="block">
    //     <div className="flex items-center justify-end text-[#00652E] dark:text-[#60A43A]">
    //       <Link
    //         href="/forgot-password"
    //         className="text-sm font-medium underline hover:no-underline transition-all"
    //       >
    //         Forgot password?
    //       </Link>
    //     </div>
    //   </Field>

    //   <ButtonPrimary
    //     type="submit"
    //     color="loginbtn"
    //     disabled={isLoading || !formData.email || !formData.password}
    //   >
    //     {isLoading ? 'Logging in...' : 'Login'}
    //   </ButtonPrimary>
    // </form>
    <form className={`grid grid-cols-1 gap-6 ${className}`} onSubmit={handleSubmit}>
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
            className="pr-10"
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
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>
      </Field>
      <Field className="block">
        <div className="flex items-center justify-end text-[#00652E] dark:text-[#60A43A]">
          <Link href="/forgot-password" className="text-sm font-medium underline">
            Forgot password?
          </Link>
        </div>
      </Field>
      <ButtonPrimary
        type="submit"
        color="loginbtn"
        disabled={isLoading || !formData.emailOrUsername || !formData.password}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </ButtonPrimary>
    </form>
  )
}
