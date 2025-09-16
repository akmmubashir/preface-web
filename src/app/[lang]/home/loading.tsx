import { getDictionary } from '@/i18n'
export default async function Loading({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-[20px]">
        <div className="animate-duration-[500ms] size-12 animate-spin rounded-full border-2 border-dashed border-[#60a43a] dark:border-white"></div>
        <p className="animate-duration-[500ms] animate-bounce text-sm tracking-widest text-[#60a43a] uppercase dark:text-white">
          {dict.common.loading}
        </p>
      </div>
    </div>
  )
}
