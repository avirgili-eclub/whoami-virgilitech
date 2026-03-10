import { useState, useEffect } from 'react';
import type { Lang } from '../config/i18n';

interface Props {
  initialLang?: Lang;
}

export default function LangToggle({ initialLang = 'es' }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'es' || saved === 'en') {
      setLang(saved);
      applyLang(saved);
    }
  }, []);

  function applyLang(l: Lang) {
    document.documentElement.lang = l;
    // Notify all data-i18n elements
    document.querySelectorAll<HTMLElement>('[data-es][data-en]').forEach((el) => {
      el.textContent = el.dataset[l] ?? el.textContent;
    });
    // Notify terminal island if present
    window.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }

  function handleSwitch(l: Lang) {
    setLang(l);
    localStorage.setItem('lang', l);
    applyLang(l);
  }

  return (
    <div
      className="lang-toggle"
      role="group"
      aria-label="Cambiar idioma / Switch language"
    >
      <button
        className={`lang-btn${lang === 'es' ? ' active' : ''}`}
        onClick={() => handleSwitch('es')}
        aria-pressed={lang === 'es'}
        aria-label="Español"
      >
        ES
      </button>
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => handleSwitch('en')}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
