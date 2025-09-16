import { defaultLocale } from './settings'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  ml: () => import('./dictionaries/ml.json').then((module) => module.default),
}
export const getDictionary = async (locale: string) => {
  try {
    if (!(locale in dictionaries)) {
      console.warn(`Dictionary not found for locale: ${locale}, falling back to ${defaultLocale}`)
      return await dictionaries[defaultLocale as keyof typeof dictionaries]()
    }

    return await dictionaries[locale as keyof typeof dictionaries]()
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error)
    return await dictionaries[defaultLocale as keyof typeof dictionaries]()
  }
}
