import { CustomLink } from '@/data/types'
import Logo from '@/shared/Logo'
import SocialsListStroke2 from '@/shared/SocialsListStroke2'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'Categories',
    menus: [
      { href: '/', label: 'Belief' },
      { href: '/', label: 'Idealism' },
      { href: '/', label: 'Sufism' },
      { href: '/', label: 'Tafseer' },
      { href: '/', label: 'Heritage' },
    ],
  },
  {
    id: '2',
    title: 'Topics',
    menus: [
      { href: '/', label: 'Hadith in Daily Life' },
      { href: '/', label: 'Hajj Comprehensive Study' },
      { href: '/', label: 'Quran at Makkah' },
      { href: '/', label: 'Quran at Madina' },
      { href: '/', label: 'Hadith in Daily Life' },
    ],
  },
  {
    id: '3',
    title: 'Islam for beginners',
    menus: [
      { href: '/', label: 'Zakat' },
      { href: '/', label: 'Hajj' },
      { href: '/', label: 'Umra' },
      { href: '/', label: 'Fasting' },
      { href: '/', label: 'Pray' },
    ],
  },
  {
    id: '4',
    title: 'Most Engaged',
    menus: [
      { href: '/', label: 'Belief Articles' },
      { href: '/', label: 'Quraan Audio' },
      { href: '/', label: 'Hadith Video' },
      { href: '/', label: 'Hadith in Daily Life' },
      { href: '/', label: 'Quran at Makkah' },
    ],
  },
]

const Footer: React.FC<{ lang?: string }> = ({ lang }) => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Top 5</h2>
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {/* footer */}
      <div
        className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
            <div className="col-span-2 md:col-span-1">
              <Logo size="size-10" />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              {/* <SocialsList1 /> */}
              <SocialsListStroke2 />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#444444] dark:text-white">info@preface.com</span>
              <span className="text-sm text-[#444444] dark:text-white">www.preface.com</span>
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  )
}

export default Footer
