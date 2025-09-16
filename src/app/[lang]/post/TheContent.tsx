'use client'
import draftToHtml from 'draftjs-to-html'
import { useMemo } from 'react'

interface RawDraftInlineStyleRange {
  offset: number
  length: number
  style: string
}

interface RawDraftEntityRange {
  key: number
  length: number
  offset: number
}

interface RawDraftContentBlock {
  key: string
  text: string
  type: string
  depth: number
  inlineStyleRanges: RawDraftInlineStyleRange[]
  entityRanges: RawDraftEntityRange[]
  data?: Record<string, unknown>
}

interface RawDraftContentState {
  blocks: RawDraftContentBlock[]
  entityMap: Record<string, unknown>
}

function isRawDraftContentState(value: unknown): value is RawDraftContentState {
  if (!value || typeof value !== 'object') return false
  const maybe = value as { blocks?: unknown }
  return Array.isArray(maybe.blocks)
}

const TheContent = ({ content }: { content: string }) => {
  const html = useMemo(() => {
    try {
      const maybeJson = typeof content === 'string' ? JSON.parse(content) : content
      if (isRawDraftContentState(maybeJson)) {
        return draftToHtml(maybeJson as unknown as RawDraftContentState)
      }
      return typeof content === 'string' ? content : ''
    } catch {
      return content
    }
  }, [content])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default TheContent
