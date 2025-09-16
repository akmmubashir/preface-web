import ButtonPrimary from '@/shared/ButtonPrimary'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Textarea from '@/shared/Textarea'

const Page = () => {
  return (
    <form className="max-w-5xl rounded-xl md:border md:p-6" action="#" method="post">
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block md:col-span-2">
          <Label>Post Title *</Label>

          <Input type="text" className="mt-1" />
        </Field>
        <Field className="block md:col-span-2">
          <Label>Post Excerpt</Label>

          <Textarea className="mt-1" rows={4} />
          <p className="mt-1 text-sm text-neutral-500">Brief description for your article. URLs are hyperlinked.</p>
        </Field>
        <Field className="block">
          <Label>Category</Label>

          <Select className="mt-1">
            <option value="-1">– select –</option>
            <option value="ha'apai">Category 1</option>
            <option value="tongatapu">Category 2</option>
            <option value="vava'u">Category 3</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>Tags</Label>

          <Input type="text" className="mt-1" />
        </Field>

        <div className="block md:col-span-2">
          <Label>Featured Image</Label>

          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pt-5 pb-6 dark:border-neutral-700">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col text-sm text-neutral-600 sm:flex-row">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-600 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-primary-800"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="ps-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
            </div>
          </div>
        </div>
        <Field className="block md:col-span-2">
          <Label> Post Content</Label>

          <Textarea className="mt-1" rows={16} />
        </Field>

        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Submit post</ButtonPrimary>
        </div>
      </Fieldset>
    </form>
  )
}

export default Page
