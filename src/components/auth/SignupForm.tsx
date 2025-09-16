'use client'

import { signup } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  username: string
  surname: string
}

interface SignupFormProps {
  className?: string
}

export default function SignupForm({ className = '' }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    surname: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<SignupFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const router = useRouter()

  const signupMutation = useMutation({
    mutationFn: (data: Omit<SignupFormData, 'confirmPassword'>) => signup(data),
    onSuccess: (data) => {
      toast.success('Verification email sent! Please check your inbox.')
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
    onError: (error: Error) => {
      // Clear the email field if email is already registered
      if (error.message.toLowerCase().includes('email already')) {
        setFormData((prev) => ({ ...prev, email: '' }))
        // Focus on the email field
        setTimeout(() => {
          const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
          emailInput?.focus()
        }, 100)
      }

      // Show error message
      toast.error(error.message || 'Signup failed. Please try again.')
    },
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const { confirmPassword, ...signupData } = formData

    // Generate username from name if not provided
    const username = formData.username || formData.name.toLowerCase().replace(/\s+/g, '')

    // Generate surname from name if not provided
    const surname = formData.surname || formData.name.split(' ').slice(1).join(' ') || formData.name

    try {
      await signupMutation.mutateAsync({
        ...signupData,
        username,
        surname,
      })
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  const handleInputChange = (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword

  return (
    <form className={`grid grid-cols-1 gap-6 ${className}`} onSubmit={handleSubmit}>
      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">Full Name</Label>
        <Input
          type="text"
          placeholder="Enter your full name"
          className="mt-1"
          value={formData.name}
          onChange={handleInputChange('name')}
          required
          disabled={signupMutation.isPending}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </Field>

      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          className="mt-1"
          value={formData.email}
          onChange={handleInputChange('email')}
          required
          disabled={signupMutation.isPending}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </Field>

      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">Username</Label>
        <Input
          type="text"
          placeholder="Choose a username"
          className="mt-1"
          value={formData.username}
          onChange={handleInputChange('username')}
          disabled={signupMutation.isPending}
        />
        <p className="mt-1 text-xs text-gray-500">If left empty, a username will be generated from your name</p>
      </Field>

      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">Password</Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            className="w-full pr-10"
            placeholder="Enter your password (min 8 characters)"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            minLength={8}
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={signupMutation.isPending}
          >
            {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </Field>

      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
          Confirm Password
        </Label>
        <div className="relative mt-1">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full pr-10"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            required
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            disabled={signupMutation.isPending}
          >
            {showConfirmPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
      </Field>

      <ButtonPrimary
        type="submit"
        color="loginbtn"
        disabled={signupMutation.isPending || !isFormValid}
        className="w-full justify-center py-3"
      >
        {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
      </ButtonPrimary>
    </form>
  )
}
