// 'use client'

// import Header from '@/components/Header/Header'
// import Header2 from '@/components/Header/Header2'
// import HeaderLogged from '@/components/Header/HeaderLogged'
// import { useThemeMode } from '@/hooks/useThemeMode'
// import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
// import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
// import { Cog8ToothIcon as CogIcon, ShoppingBagIcon as ShoppingCartIcon } from '@heroicons/react/24/outline'
// import { usePathname } from 'next/navigation'
// import { Fragment, useEffect, useMemo, useState } from 'react'

// const SiteHeader = () => {
//   let pathname = usePathname()
//   useThemeMode()
//   //

//   //
//   // FOR OUR DEMO PAGE, use do not use this, you can delete it.
//   const [headerSelected, setHeaderSelected] = useState<'Header 1' | 'Header 2' | 'Header 3'>('Header 1')
//   const [themeDir, setThemeDIr] = useState<'rtl' | 'ltr'>('ltr')

//   //
//   useEffect(() => {
//     if (themeDir === 'rtl') {
//       document.querySelector('html')?.setAttribute('dir', 'rtl')
//     } else {
//       document.querySelector('html')?.removeAttribute('dir')
//     }
//     return () => {
//       document.querySelector('html')?.removeAttribute('dir')
//     }
//   }, [themeDir])

//   //

//   const renderRadioThemeDir = () => {
//     return (
//       <div>
//         <span className="text-sm font-medium">Theme dir</span>
//         <div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
//           {(['rtl', 'ltr'] as ('rtl' | 'ltr')[]).map((dir) => {
//             return (
//               <div
//                 key={dir}
//                 className={`flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-xs font-medium uppercase select-none ${
//                   themeDir === dir
//                     ? 'bg-black text-white shadow-lg shadow-black/10 dark:bg-neutral-200 dark:text-black'
//                     : 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
//                 }`}
//                 onClick={() => setThemeDIr(dir)}
//               >
//                 {dir}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }
//   const renderRadioHeaders = () => {
//     return (
//       <div>
//         <span className="text-sm font-medium">Header styles</span>
//         <div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
//           {['Header 1', 'Header 2', 'Header 3'].map((header) => {
//             return (
//               <div
//                 key={header}
//                 className={`flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-xs font-medium select-none ${
//                   headerSelected === header
//                     ? 'bg-black text-white shadow-lg shadow-black/10 dark:bg-neutral-200 dark:text-black'
//                     : 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
//                 }`}
//                 onClick={() => setHeaderSelected(header as 'Header 1' | 'Header 2' | 'Header 3')}
//               >
//                 {header}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }
//   const renderControlSelections = () => {
//     return (
//       <div className="ControlSelections relative z-40 hidden md:block">
//         <div className="fixed top-1/4 right-3 z-40 flex items-center">
//           <Popover className="relative">
//             {({ open }) => (
//               <>
//                 <PopoverButton
//                   className={`z-10 rounded-xl border border-neutral-200 bg-white p-2.5 shadow-xl hover:bg-neutral-100 focus:outline-hidden dark:border-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 ${
//                     open ? 'ring-primary-500 focus:ring-2' : ''
//                   }`}
//                 >
//                   <CogIcon className="h-8 w-8" />
//                 </PopoverButton>
//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-200"
//                   enterFrom="opacity-0 translate-y-1"
//                   enterTo="opacity-100 translate-y-0"
//                   leave="transition ease-in duration-150"
//                   leaveFrom="opacity-100 translate-y-0"
//                   leaveTo="opacity-0 translate-y-1"
//                 >
//                   <PopoverPanel className="absolute right-0 z-10 mt-3 w-screen max-w-sm">
//                     <div className="nc-custom-shadow-1 overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
//                       <div className="relative space-y-3.5 p-6 xl:space-y-5">
//                         <span className="text-xl font-semibold">Customize</span>
//                         <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
//                         {renderRadioThemeDir()}
//                         {renderRadioHeaders()}
//                         <div className="flex space-x-2 xl:space-x-4 rtl:space-x-reverse">
//                           <span className="text-sm font-medium">Dark mode</span>
//                           <SwitchDarkMode2 />
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 p-5 dark:bg-white/5">
//                         <a
//                           className="flex w-full items-center justify-center rounded-xl! bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
//                           href={'https://themeforest.net/item/ncmaz-blog-news-magazine-nextjs-template/44412092'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <ShoppingCartIcon className="h-4 w-4" />
//                           <span className="ms-2">Buy this template</span>
//                         </a>
//                       </div>
//                     </div>
//                   </PopoverPanel>
//                 </Transition>
//               </>
//             )}
//           </Popover>
//         </div>
//       </div>
//     )
//   }
//   //

//   const headerComponent = useMemo(() => {
//     let HeadComponent = HeaderLogged
//     if (pathname === '/home-2' || headerSelected === 'Header 2') {
//       HeadComponent = Header
//     }
//     if (pathname === '/home-3' || headerSelected === 'Header 3') {
//       HeadComponent = Header2
//     }

//     return <HeadComponent />
//   }, [pathname, headerSelected])

//   return (
//     <>
//       {/* for our demo page, please delete this if you do not use */}
//       {renderControlSelections()}
//       {/*  */}

//       {headerComponent}
//     </>
//   )
// }

// export default SiteHeader
