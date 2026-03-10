import { useState, useEffect } from 'react';

interface ContactStrings {
  heading: string;
  desc: string;
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  placeholders: { name: string; email: string; message: string };
}

interface Props {
  endpoint: string;
  es: ContactStrings;
  en: ContactStrings;
}

export default function ContactForm({ endpoint, es, en }: Props) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en') setLang('en');

    const handler = (e: Event) => setLang((e as CustomEvent<'es' | 'en'>).detail);
    window.addEventListener('langchange', handler);
    return () => window.removeEventListener('langchange', handler);
  }, []);

  const t = lang === 'en' ? en : es;
  const disabled = status === 'sending' || status === 'success';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--r-md)',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-1)',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color var(--duration)',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--sp-3xl)', alignItems: 'start' }}>

      {/* Left: info */}
      <div>
        <h2
          style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.3px', marginBottom: '12px', color: 'var(--text-1)' }}
          data-es={es.heading}
          data-en={en.heading}
        >
          {t.heading}
        </h2>
        <p
          style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)' }}
          data-es={es.desc}
          data-en={en.desc}
        >
          {t.desc}
        </p>
      </div>

      {/* Right: form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-2)' }}>{t.name}</label>
            <input
              type="text"
              name="name"
              required
              placeholder={t.placeholders.name}
              style={inputStyle}
              disabled={disabled}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-2)' }}>{t.email}</label>
            <input
              type="email"
              name="email"
              required
              placeholder={t.placeholders.email}
              style={inputStyle}
              disabled={disabled}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-2)' }}>{t.message}</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={t.placeholders.message}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            disabled={disabled}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            type="submit"
            className="btn-cv"
            disabled={disabled}
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: status === 'sending' ? 0.7 : 1,
              border: '1.5px solid var(--accent)',
            }}
          >
            {status === 'sending' ? t.sending : t.send}
          </button>

          {status === 'success' && (
            <p style={{ fontSize: '13px', color: 'var(--status-active-text)', fontWeight: 500 }}>
              {t.success}
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '13px', color: 'var(--status-fix)', fontWeight: 500 }}>
              {t.error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
