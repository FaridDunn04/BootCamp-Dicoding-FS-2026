import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.25 8.25 0 1 0 10.5 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const themeLabel = theme === 'dark' ? t('lightTheme') : t('darkTheme');
  const ariaLabel = `${t('theme')}: ${themeLabel}`;

  return (
    <button type="button" className="site-action site-action--icon" onClick={toggleTheme} aria-label={ariaLabel} title={ariaLabel}>
      <span className="site-action__icon" aria-hidden="true">
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}

export default ThemeToggle;