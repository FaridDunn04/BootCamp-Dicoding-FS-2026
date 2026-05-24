import React from 'react';
import { createTranslator } from '../utils/i18n';

const LanguageContext = React.createContext(null);

function LanguageProvider({ children }) {
  const [locale, setLocale] = React.useState(() => localStorage.getItem('locale') || 'id');

  React.useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale === 'en' ? 'en' : 'id';
  }, [locale]);

  const toggleLocale = () => {
    setLocale((currentLocale) => (currentLocale === 'id' ? 'en' : 'id'));
  };

  const t = React.useMemo(() => createTranslator(locale), [locale]);
  const value = React.useMemo(() => ({ locale, toggleLocale, t }), [locale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}

export { LanguageProvider, useLanguage };