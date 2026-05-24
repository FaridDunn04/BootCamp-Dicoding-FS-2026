import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function TranslateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 6.5h9.5M8.75 6.5V5M6.4 10.5h4.7M12.5 18.5l2.2-5.8 2.2 5.8M13.3 16.4h2.8M9.2 10.5c0 2.2-1.9 4.8-4.2 6.1M5 9.5c.6 1.1 1.6 2.3 3.2 3.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();
  const nextLocaleLabel = locale === 'id' ? t('english') : t('indonesian');
  const ariaLabel = `${t('language')}: ${nextLocaleLabel}`;

  return (
    <button
      type="button"
      className="site-action site-action--icon"
      onClick={toggleLocale}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <span className="site-action__icon" aria-hidden="true">
        <TranslateIcon />
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}

export default LanguageToggle;