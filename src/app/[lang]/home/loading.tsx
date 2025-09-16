import { getDictionary } from '@/i18n'
export default async function Loading({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black overflow-hidden">
    <div className="flex flex-col items-center gap-[20px]">
      <div className="size-12 animate-spin animate-duration-[500ms] rounded-full border-2 border-dashed border-[#60a43a] dark:border-white"></div>
      <p className="animate-bounce animate-duration-[500ms] text-sm uppercase tracking-widest text-[#60a43a] dark:text-white">{dict.common.loading}</p>
    </div>
  </div>
  )
}
