import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Lang = 'es' | 'en';

function getLangFromDocument(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  localStorage.setItem('theme', theme);
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    const currentTheme: Theme = rootTheme === 'dark' ? 'dark' : 'light';
    setTheme(currentTheme);
    setLang(getLangFromDocument());

    const handleLangChange = (event: Event) => {
      const nextLang = (event as CustomEvent<Lang>).detail;
      setLang(nextLang === 'en' ? 'en' : 'es');
    };

    window.addEventListener('langchange', handleLangChange as EventListener);
    return () => {
      window.removeEventListener('langchange', handleLangChange as EventListener);
    };
  }, []);

  const isDark = theme === 'dark';
  const label =
    lang === 'en'
      ? isDark
        ? 'Enable light mode'
        : 'Enable dark mode'
      : isDark
      ? 'Activar modo claro'
      : 'Activar modo oscuro';

  const handleToggle = () => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      onClick={handleToggle}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
