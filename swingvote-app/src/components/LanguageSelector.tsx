import { useTranslation } from "@/i18n/useTranslation";

export function LanguageSelector() {
  const { language, changeLanguage } = useTranslation();
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
      <button onClick={() => changeLanguage("en")} className={"px-2 py-1 rounded text-xs font-medium transition-colors " + (language === "en" ? "bg-purple-600 text-white" : "text-white/50 hover:text-white")}>EN</button>
      <button onClick={() => changeLanguage("es")} className={"px-2 py-1 rounded text-xs font-medium transition-colors " + (language === "es" ? "bg-purple-600 text-white" : "text-white/50 hover:text-white")}>ES</button>
    </div>
  );
}
