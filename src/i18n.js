import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        // Распознавание и кэширование языковых кук
        detection: {
            order: ["queryString", "cookie"],
            cache: ["cookie"]
        },
        interpolation: {
            escapeValue: false
        },
        resources
    });

export default i18n;
