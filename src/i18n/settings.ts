export const defaultLocale = "en";
export const locales = ["en", "ar", "ml"];

export const localeNames = {
  en: "English",
  ar: "العربية",
  ml: "മലയാളം",
};

// Add RTL support for Arabic
export const rtlLocales = ["ar"];

export function isRTL(locale: string) {
  return rtlLocales.includes(locale);
}
