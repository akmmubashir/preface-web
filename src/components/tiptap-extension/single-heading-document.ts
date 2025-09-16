// app/lib/tiptap-extensions/CustomDocument.ts
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'

export const SingleHeadingDocument = Document.extend({
  content: 'heading',
})

export const OnlyOneHeading = Heading.extend({
  addOptions() {
    return {
      levels: [1] as any[],
      HTMLAttributes: {
        class: 'only-one-heading',
      },
    }
  },
})
