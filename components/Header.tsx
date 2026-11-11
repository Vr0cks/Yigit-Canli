'use client';

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/contact-modal';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Eskiden üç renk teması vardı (Soul / Racing) ve seçim localStorage'da
    // saklanıyordu. Seçici kalktı; daha önce seçim yapmış bir ziyaretçide
    // eski sınıf html'e yapışık kalmasın diye burada temizleniyor.
    try {
      document.documentElement.classList.remove('soul-theme', 'racing-theme');
      localStorage.removeItem('colorTheme');
    } catch {
      /* gizli sekmede localStorage kapalı olabilir */
    }
  }, []);

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  if (!mounted) return null;
  if (pathname.includes('/secret')) return null;

  const dugme =
    'p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md text-[var(--muted)] hover:text-[var(--foreground)] transition-colors';

  return (
    <>
      <header className="fixed top-0 right-0 p-4 md:p-6 z-50 flex items-center gap-2 md:gap-3">

        <button onClick={() => setIsContactOpen(true)} className={dugme} aria-label="İletişim">
          <Mail size={16} />
        </button>

        <div className="hidden sm:flex items-center gap-0.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md px-1 py-1">
          {['tr', 'en', 'de'].map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded-full transition-colors ${
                locale === lang
                  ? 'text-[var(--foreground)] bg-[var(--card-border)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="sm:hidden flex items-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-md px-2.5 py-1.5">
          <span className="text-[10px] font-mono text-[var(--muted)]">{locale.toUpperCase()}</span>
        </div>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={dugme}
          aria-label="Tema"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

      </header>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
