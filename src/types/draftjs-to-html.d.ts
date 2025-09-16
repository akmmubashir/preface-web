declare module 'draftjs-to-html' {
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

  function draftToHtml(contentState: RawDraftContentState): string
  export default draftToHtml
}
