'use client';

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun, Mail } from 'lucide-react'; // Mail ikonunu ekledik
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/contact-modal'; // Modal'ı buraya da import ettik

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  // Header için ayrı bir modal state'i
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  if (!mounted) return null;

  if (pathname.includes('/secret')) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 right-0 p-6 z-50 flex items-center gap-4">
        
        {/* --- İLETİŞİM BUTONU (YENİ) --- */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="p-2.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:scale-105 active:scale-95 transition-all group"
          aria-label="Contact"
        >
          <Mail size={20} className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
        </button>

        {/* --- DİL SEÇİCİ --- */}
        <div className="flex items-center bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-1 py-1 shadow-sm transition-colors">
          {['tr', 'en', 'de'].map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`
                px-3 py-1 text-xs font-mono rounded-full transition-all duration-300
                ${locale === lang 
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }
              `}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* --- TEMA SEÇİCİ --- */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="
            relative p-2.5 rounded-full overflow-hidden shadow-lg border
            bg-white dark:bg-black 
            border-black/10 dark:border-white/20
            hover:scale-105 active:scale-95 transition-transform duration-300
            group
          "
          aria-label="Toggle Theme"
        >
          <div className="relative w-5 h-5">
            <Sun 
              size={20} 
              className="absolute inset-0 text-white transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" 
            />
            <Moon 
              size={20} 
              className="absolute inset-0 text-black transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" 
            />
          </div>
        </button>

      </header>

      {/* Header üzerinden tetiklenen Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}