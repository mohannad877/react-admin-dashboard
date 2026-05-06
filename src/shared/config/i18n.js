import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import locales directly for initial load (optional, but good for SPA without backend i18n hosting)
import arTranslation from '../../locales/ar/translation.json';
import enTranslation from '../../locales/en/translation.json';
import frTranslation from '../../locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslation },
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
    },
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    }
  });

export const switchLanguage = (lang) => {
  i18n.changeLanguage(lang);
  // RTL languages: Arabic only (Urdu/Persian would also be RTL)
  const isRTL = lang === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
};

// Set initial direction
document.documentElement.dir = i18n.language.startsWith('ar') ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;
