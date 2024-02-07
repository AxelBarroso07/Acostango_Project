import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from '../languages/en.json';
import gerTranslations from '../languages/ger.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ger: {
        translation: gerTranslations,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation'
  })

export default i18n