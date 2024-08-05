import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translate_en from "./en.json";
import translate_zh from "./zh.json";

const resources = {
  en: {
    translation: translate_en
  },
  zh: {
    translation: translate_zh
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, // init options
    lng: "en", //initial language for the UI

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
