'use client'

import { Badge } from '@/shared/Badge'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import type React from 'react'
import { useCallback, useState } from 'react'

interface Tag {
  id: string
  name: string
  color?: string
}

interface TagsInputProps {
  value: Tag[]
  onChange: (tags: Tag[]) => void
  suggestions?: Tag[]
  placeholder?: string
  maxTags?: number
  allowCreate?: boolean
  className?: string
}

export function TagsInput({
  value = [],
  onChange,
  suggestions = [],
  placeholder = 'Add tags...',
  maxTags,
  allowCreate = true,
  className,
}: TagsInputProps) {
  const [query, setQuery] = useState('')

  // Filter suggestions based on query and exclude already selected tags
  const filteredSuggestions = suggestions.filter((suggestion) => {
    const isAlreadySelected = value.some((tag) => tag.id === suggestion.id)
    const matchesQuery = suggestion.name.toLowerCase().includes(query.toLowerCase())
    return !isAlreadySelected && matchesQuery
  })

  // Check if we should show "Create new tag" option
  const shouldShowCreateOption =
    allowCreate &&
    query.trim() !== '' &&
    !filteredSuggestions.some((suggestion) => suggestion.name.toLowerCase() === query.toLowerCase()) &&
    !value.some((tag) => tag.name.toLowerCase() === query.toLowerCase())

  const handleSelect = useCallback(
    (selectedTag: Tag | null) => {
      if (!selectedTag) return

      // Check if it's a "create new" tag
      if (selectedTag.id === '__create_new__') {
        const newTag: Tag = {
          id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: query.trim(),
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
        }
        onChange([...value, newTag])
      } else {
        onChange([...value, selectedTag])
      }

      setQuery('')
    },
    [value, onChange, query]
  )

  const handleRemoveTag = useCallback(
    (tagToRemove: Tag) => {
      onChange(value.filter((tag) => tag.id !== tagToRemove.id))
    },
    [value, onChange]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Backspace' && query === '' && value.length > 0) {
        // Remove last tag when backspace is pressed and input is empty
        onChange(value.slice(0, -1))
      }
    },
    [query, value, onChange]
  )

  const isMaxTagsReached = maxTags ? value.length >= maxTags : false

  return (
    <div className={clsx('w-full', className)}>
      <Combobox value={null} onChange={handleSelect} disabled={isMaxTagsReached}>
        <div className="relative">
          {/* Tags display and input container */}
          <div className="flex flex-wrap items-center gap-1.5 focus-within:outline-hidden focus-visible:right-0">
            {/* Render selected tags */}
            {value.map((tag) => (
              <Badge key={tag.id} className="text-sm/6!" color="indigo">
                {tag.name}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="flex items-center justify-center hover:text-red-600 focus:outline-none"
                  aria-label={`Remove ${tag.name} tag`}
                >
                  <XMarkIcon className="size-3" />
                </button>
              </Badge>
            ))}

            {/* Input field */}
            <div className="min-w-32 flex-1 overflow-hidden">
              <ComboboxInput
                className="w-full truncate border-none bg-transparent px-0 tracking-normal placeholder-neutral-600 outline-none focus-visible:ring-0 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:text-sm dark:placeholder-neutral-300"
                placeholder={isMaxTagsReached ? `Maximum ${maxTags} tags reached` : placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isMaxTagsReached}
                aria-label="Tag input"
                aria-describedby="tags-help"
              />
            </div>
          </div>

          {/* Dropdown options */}
          <ComboboxOptions className="absolute z-40 mt-1 hidden-scrollbar max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-lg focus:outline-none dark:bg-neutral-800">
            {filteredSuggestions.length === 0 && !shouldShowCreateOption ? (
              <div className="px-3 py-2 text-sm text-neutral-500">
                {query === '' ? 'Start typing to see suggestions' : 'No suggestions found'}
              </div>
            ) : (
              <>
                {/* Existing suggestions */}
                {filteredSuggestions.map((suggestion) => (
                  <ComboboxOption
                    key={suggestion.id}
                    value={suggestion}
                    className="group flex items-center gap-2 px-3 py-2 text-sm select-none data-focus:bg-neutral-100 dark:data-focus:bg-white/10"
                  >
                    <div
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: suggestion.color || '#6b7280' }}
                    />
                    <span className="truncate">{suggestion.name}</span>
                  </ComboboxOption>
                ))}

                {/* Create new tag option */}
                {shouldShowCreateOption && (
                  <ComboboxOption
                    value={{
                      id: '__create_new__',
                      name: query.trim(),
                    }}
                    className="group flex items-center gap-2 border-t px-3 py-2 text-sm select-none data-focus:bg-neutral-100 dark:data-focus:bg-white/10"
                  >
                    <div className="size-3 flex-shrink-0 rounded-full bg-neutral-400" />
                    <span className="truncate">Create &quot;{query.trim()}&quot;</span>
                  </ComboboxOption>
                )}
              </>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>

      {/* Help text */}
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {maxTags && (
          <>
            Selected {value.length} of {maxTags} tags.{' '}
          </>
        )}
        Press backspace to remove the last tag.
      </p>
    </div>
  )
}
