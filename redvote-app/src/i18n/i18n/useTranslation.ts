import { useState, useCallback } from "react";
import { translations, type Language } from "./translations";

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    return (saved === "es" ? "es" : "en") as Language;
  });

  const t = useCallback((key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  }, []);

  return { t, language, changeLanguage };
}
