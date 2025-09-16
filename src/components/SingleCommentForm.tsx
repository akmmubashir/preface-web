import { Button } from '@/shared/Button'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Textarea from '@/shared/Textarea'
import React, { FC } from 'react'

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
  className?: string
  onClickSubmit?: () => void
  onClickCancel?: () => void
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>
  defaultValue?: string
  rows?: number
}

const SingleCommentForm: FC<Props> = ({
  className = 'mt-5',
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = '',
  rows = 4,
  ...props
}) => {
  return (
    <form className={`single-comment-form ${className}`}>
      <Textarea
        placeholder="Add to discussion"
        ref={textareaRef}
        required={true}
        defaultValue={defaultValue}
        rows={rows}
        {...props}
      />
      <div className="mt-3 flex gap-3">
        <Button plain type="button" onClick={onClickCancel}>
          Cancel
        </Button>
        <ButtonPrimary onClick={onClickSubmit} type="submit">
          Submit
        </ButtonPrimary>
      </div>
    </form>
  )
}

export default SingleCommentForm
