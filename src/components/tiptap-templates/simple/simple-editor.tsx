'use client'

import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import * as React from 'react'

// --- Tiptap Core Extensions ---
import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { Text } from '@tiptap/extension-text'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'

// --- Custom Extensions ---
import { Link } from '@/components/tiptap-extension/link-extension'
import { Selection } from '@/components/tiptap-extension/selection-extension'
import { TrailingNode } from '@/components/tiptap-extension/trailing-node-extension'
import Placeholder from '@tiptap/extension-placeholder'

// --- UI Primitives ---
import { Button } from '@/components/tiptap-ui-primitive/button'
import { Spacer } from '@/components/tiptap-ui-primitive/spacer'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'

// --- Tiptap Node ---
import '@/components/tiptap-node/image-node/image-node.scss'
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

// --- Tiptap UI ---
import { BlockQuoteButton } from '@/components/tiptap-ui/blockquote-button'
import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from '@/components/tiptap-ui/color-highlight-popover'
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button'
import { LinkButton, LinkContent, LinkPopover } from '@/components/tiptap-ui/link-popover'
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu'
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button'
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'

// --- Icons ---
import { ArrowLeftIcon } from '@/components/tiptap-icons/arrow-left-icon'
import { HighlighterIcon } from '@/components/tiptap-icons/highlighter-icon'
import { LinkIcon } from '@/components/tiptap-icons/link-icon'

// --- Hooks ---
import { useMobile } from '@/hooks/use-mobile'

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils'

// --- Styles ---
import '@/components/tiptap-templates/simple/simple-editor.scss'

import { OnlyOneHeading, SingleHeadingDocument } from '@/components/tiptap-extension/single-heading-document'
import { SingleImageDocument } from '@/components/tiptap-extension/single-image-document'
import { Button as SharedButton } from '@/shared/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Divider } from '@/shared/divider'
import Logo from '@/shared/Logo'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import { TagsInput } from '@/shared/TagsInput'
import { useRouter } from 'next/navigation'

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      <Spacer />
    </>
  )
}

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
)

export function SimpleEditor() {
  // Example topicsSuggestions
  const topicsSuggestions = [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Next.js' },
    { id: '4', name: 'TailwindCSS' },
    { id: '5', name: 'JavaScript' },
    { id: '6', name: 'Node.js' },
    { id: '7', name: 'GraphQL' },
    { id: '8', name: 'Docker' },
    { id: '9', name: 'Hello' },
    { id: '10', name: 'MongoDB' },
  ]

  const isMobile = useMobile()
  const [mobileView, setMobileView] = React.useState<'main' | 'highlighter' | 'link'>('main')
  const toolbarRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [selectedTags, setSelectedTags] = React.useState<typeof topicsSuggestions>([])
  const [featuredImageUrl, setFeaturedImageUrl] = React.useState('')
  const [isOpenPreview, setIsOpenPreview] = React.useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'prose mx-auto max-w-screen-md dark:prose-invert lg:prose-lg',
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Write, type "/" for commands...'
        },
      }),
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 5,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: `<h2>Typography should be easy, </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li> That’s a bullet list with one … </li>
      <li> … or two list items. </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — John Doe
    </blockquote>`,
  })

  const featuredImageEditor = useEditor({
    immediatelyRender: false,
    editable: false, // important...
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Featured image area, start typing to enter text.',
        class: 'prose mx-auto max-w-screen-md dark:prose-invert lg:prose-lg featuredImageEditor',
      },
    },
    extensions: [
      SingleImageDocument,
      StarterKit,
      Image,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: handleImageUpload,
        onError: (error) => {
          console.error('Upload failed:', error)
          setFeaturedImageUrl('')
        },
        onSuccess: (url) => {
          setFeaturedImageUrl(url)
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getJSON()
      if (content.content?.some((node) => node.type === 'imageUpload')) {
        setFeaturedImageUrl('')
      }
    },
  })

  const titleEditor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Title area, start typing to enter text.',
        class: 'prose mx-auto max-w-screen-md dark:prose-invert lg:prose-lg titleEditor',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          return true
        }
        return false
      },
    },
    extensions: [
      SingleHeadingDocument,
      OnlyOneHeading.configure({
        levels: [1],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Write a title...'
        },
      }),
      Text,
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getJSON()
      if (content.content && content.content.length > 1) {
        editor.commands.setContent('<h1>' + content?.content?.[0]?.content?.[0]?.text + '</h1>')
      }
    },
    content: '<h1></h1>',
  })

  const getTitle = () => {
    if (!titleEditor) return
    const content = titleEditor.getJSON()
    return content.content?.[0]?.content?.[0]?.text || ''
  }

  React.useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main')
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor }}>
      <>
        <div className="sticky top-0 z-10 flex h-[var(--tt-toolbar-height)] items-center gap-2 border-b border-neutral-200 bg-[var(--tt-toolbar-bg-color)] px-2 dark:border-neutral-800">
          <div className="flex items-center gap-1">
            <Button data-style="ghost" onClick={() => router.push('/')}>
              <ArrowLeftIcon className="tiptap-button-icon" />
              <span className="text-nowrap">Exit editor</span>
            </Button>
            <span className="me-2 hidden font-light text-neutral-500 sm:block dark:text-neutral-400">/</span>
            <Logo size="size-6" className="hidden! sm:block!" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button data-style="ghost" onClick={() => setIsOpenPreview(true)}>
              Publish
            </Button>
            <Button data-style="ghost" onClick={() => setIsOpenPreview(true)}>
              Preview
            </Button>
            <SwitchDarkMode iconSize="size-4.5" className="size-8!" />
          </div>
        </div>

        <div className="title-wrapper container mt-8 sm:mt-12">
          <div className="mx-auto max-w-screen-md">
            <ImageUploadButton
              className="h-10! ring-2 ring-neutral-200 dark:ring-neutral-600"
              text={featuredImageUrl ? 'Update featured image' : 'Add featured image'}
              editor={featuredImageEditor}
            />
          </div>
          <EditorContent editor={featuredImageEditor} role="presentation" />
          <EditorContent editor={titleEditor} role="presentation" />

          <div className="mx-auto mt-4 max-w-screen-md sm:mt-8">
            <TagsInput
              value={selectedTags}
              suggestions={topicsSuggestions}
              onChange={setSelectedTags}
              placeholder="Add a topic..."
              maxTags={5}
              className="w-full"
            />
          </div>
        </div>

        <Toolbar ref={toolbarRef} className="my-8 sm:my-12">
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <div className="content-wrapper container">
          <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
        </div>
      </>

      {/* Preview Dialog */}
      <Dialog className="mt-4" size="4xl" open={isOpenPreview} onClose={setIsOpenPreview}>
        <DialogTitle>Preview the post you will publish</DialogTitle>
        <DialogBody>
          <div className="flex flex-col gap-5 text-sm/6">
            <div className="flex flex-wrap gap-2.5">
              <div className="text-neutral-600 dark:text-neutral-400">Title:</div>
              <div className="font-medium">{getTitle() || 'No title'}</div>
            </div>
            <Divider />

            <div className="flex flex-wrap gap-2.5">
              <div className="text-neutral-600 dark:text-neutral-400">Tags:</div>
              <div>{selectedTags.map((tag) => tag.name).join(', ') || 'No tags'}</div>
            </div>
            <Divider />

            <div className="flex flex-col gap-2.5">
              <div className="text-neutral-600 dark:text-neutral-400">Featured image:</div>
              <div className="line-clamp-1">{featuredImageUrl || 'No featured image'}</div>
            </div>
            <Divider />

            <div className="flex flex-col gap-2.5">
              <div className="text-neutral-600 dark:text-neutral-400">Content HTML:</div>
              <div className="line-clamp-6">{editor?.getHTML() || 'No content'}</div>
            </div>
          </div>
        </DialogBody>
        <DialogActions>
          <SharedButton plain onClick={() => setIsOpenPreview(false)}>
            Cancel
          </SharedButton>
          <SharedButton onClick={() => setIsOpenPreview(false)}>Publish</SharedButton>
        </DialogActions>
      </Dialog>
    </EditorContext.Provider>
  )
}
