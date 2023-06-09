import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en.json";
import zhTranslation from "./zh.json";
(function () {
  const lang = localStorage.getItem("lang") || "zh";
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false }, // 不进行自动转义 HTML 标签
    lng: lang, // 默认使用的语言
    fallbackLng: "en", // 如果当前语言文件不存在则回退到指定语言
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation },
    },
  });
})();
