import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import polish from '../locales/PL_translation.json';
import english from '../locales/EN_translation.json';

const resources = {
  en: {
    translation: english
  },
  pl: {
    translation: polish
  }
}

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    resources,
    interpolation: {
      escapeValue: false, // React already does escaping
    }
  });

export default i18n;