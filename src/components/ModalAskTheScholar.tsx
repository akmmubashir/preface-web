'use client'

import { useSubmitScholarQuestion } from '@/hooks/api/use-scholar-questions'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { FC, useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

// Simple and clean animation variants
const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn' as const,
    },
  },
}

const modalVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 40,
      mass: 0.8,
    },
  },
}

const ModalAskTheScholar: FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    question: '',
  })

  const { mutate: submitQuestion, isPending } = useSubmitScholarQuestion()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitQuestion(
      {
        ...formData,
        mobileNumber: formData.mobile,
      },
      {
        onSuccess: () => {
          setFormData({
            name: '',
            email: '',
            mobile: '',
            question: '',
          })
          alert('Your question has been submitted successfully!')
          onClose()
        },
        onError: (error) => {
          console.error('Submission failed:', error)
          alert('Failed to submit question. Please try again.')
        },
      }
    )
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative mx-auto w-full max-w-md rounded-[10px] bg-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[#00652E] transition-colors hover:bg-green-700"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>

            {/* Header Section */}
            <div className="rounded-[10px] bg-[#00652E] px-6 py-12 text-center text-white">
              <h2 className="mb-2 text-2xl font-semibold">Ask the scholar what you have!</h2>
              <p className="text-lg font-light">You will be answered in 48 hours</p>
            </div>

            {/* Form Section */}
            <div className="px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-[#EAEAEA] px-4 py-3 text-[#969696] placeholder-gray-500 focus:border-transparent focus:ring-1 focus:ring-neutral-300 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-[#EAEAEA] px-4 py-3 text-[#969696] placeholder-gray-500 focus:border-transparent focus:ring-1 focus:ring-neutral-300 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full rounded-[10px] border border-[#EAEAEA] px-4 py-3 text-[#969696] placeholder-gray-500 focus:border-transparent focus:ring-1 focus:ring-neutral-300 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="question"
                    placeholder="Question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full resize-none rounded-[10px] border border-[#EAEAEA] px-4 py-3 text-[#969696] placeholder-gray-500 focus:border-transparent focus:ring-1 focus:ring-neutral-300 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer rounded-[25px] bg-[#60A43A] px-10 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-green-700 focus:ring-1 focus:ring-neutral-300 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                  >
                    {isPending ? 'Submitting...' : 'Submit to the Scholar'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalAskTheScholar
