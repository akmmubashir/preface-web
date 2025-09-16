// app/lib/tiptap-extensions/CustomDocument.ts
import { Document } from '@tiptap/extension-document'

export const SingleImageDocument = Document.extend({
  content: 'image?',
})
