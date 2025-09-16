'use client'

import ModalAskTheScholar from '@/components/ModalAskTheScholar'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Props {
  className?: string
  home?: boolean
  isTransparentHeader?: boolean
  dict?: any
}

const AskScholarButton = ({ className, home, isTransparentHeader, dict }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAskScholarClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={handleAskScholarClick}
        className={`flex min-w-[155px] cursor-pointer items-center gap-2 rounded-sm border border-[#EEEEEE] px-5 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none dark:border-[#777777] ${
          home
            ? isTransparentHeader
              ? 'text-[#fff] dark:text-[#fff]'
              : 'text-[#000000] dark:text-white'
            : 'text-[#000000] dark:text-white'
        } ${className}`}
        aria-label="Ask the Scholar"
        style={{ marginTop: 0 }}
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" />
        <span className="whitespace-nowrap">{dict.navigation.askthescholar}</span>
      </button>

      <ModalAskTheScholar isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default AskScholarButton
