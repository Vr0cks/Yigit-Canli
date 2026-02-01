'use client';

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun, Mail, Flame, Flag, Palette } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import ContactModal from '@/components/contact-modal';
import { motion, AnimatePresence } from 'framer-motion';

type ColorTheme = 'default' | 'soul' | 'racing';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const colorMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Load saved color theme
    const saved = localStorage.getItem('colorTheme') as ColorTheme;
    if (saved) {
      setColorTheme(saved);
      applyColorTheme(saved);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorMenuRef.current && !colorMenuRef.current.contains(e.target as Node)) {
        setIsColorMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyColorTheme = (newTheme: ColorTheme) => {
    // Remove all color theme classes from html
    document.documentElement.classList.remove('soul-theme', 'racing-theme');

    if (newTheme === 'soul') {
      document.documentElement.classList.add('soul-theme');
    } else if (newTheme === 'racing') {
      document.documentElement.classList.add('racing-theme');
    }
  };

  const handleColorTheme = (newTheme: ColorTheme) => {
    setColorTheme(newTheme);
    localStorage.setItem('colorTheme', newTheme);
    applyColorTheme(newTheme);
    setIsColorMenuOpen(false);
  };

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  if (pathname.includes('/secret')) {
    return null;
  }

  const colorThemes = [
    { id: 'default' as const, label: 'Zinc', icon: <Palette size={14} />, color: 'bg-zinc-500' },
    { id: 'soul' as const, label: 'Soul', icon: <Flame size={14} />, color: 'bg-gradient-to-r from-red-600 to-rose-600' },
    { id: 'racing' as const, label: 'Racing', icon: <Flag size={14} />, color: 'bg-gradient-to-r from-emerald-600 to-green-600' },
  ];

  const currentColorTheme = colorThemes.find(t => t.id === colorTheme) || colorThemes[0];

  return (
    <>
      <header className="fixed top-0 right-0 p-4 md:p-6 z-50 flex items-center gap-2 md:gap-4">

        {/* Contact Button */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="p-2 md:p-2.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:scale-105 active:scale-95 transition-all group"
          aria-label="Contact"
        >
          <Mail size={18} className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
        </button>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-1 py-1 shadow-sm">
          {['tr', 'en', 'de'].map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`
                px-2 md:px-3 py-1 text-[10px] md:text-xs font-mono rounded-full transition-all duration-300
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

        {/* Mobile Language - just current */}
        <div className="sm:hidden flex items-center bg-white/50 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-2 py-1 shadow-sm">
          <span className="text-[10px] font-mono font-bold">{locale.toUpperCase()}</span>
        </div>

        {/* Color Theme Selector - Car Dashboard Style */}
        <div className="relative" ref={colorMenuRef}>
          <button
            onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
            className={`
              p-2 md:p-2.5 rounded-full backdrop-blur-md border shadow-sm 
              hover:scale-105 active:scale-95 transition-all
              ${colorTheme === 'soul'
                ? 'bg-red-500/20 border-red-500/30 shadow-[0_0_15px_rgba(220,20,60,0.3)]'
                : colorTheme === 'racing'
                  ? 'bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10'
              }
            `}
            aria-label="Color Theme"
          >
            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${currentColorTheme.color}`} />
          </button>

          {/* Color Theme Dropdown */}
          <AnimatePresence>
            {isColorMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl min-w-[140px]"
              >
                {colorThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleColorTheme(theme.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${colorTheme === theme.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                    <span className="font-mono text-xs">{theme.label}</span>
                    {colorTheme === theme.id && (
                      <motion.div
                        layoutId="activeTheme"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="
            relative p-2 md:p-2.5 rounded-full overflow-hidden shadow-lg border
            bg-white dark:bg-black 
            border-black/10 dark:border-white/20
            hover:scale-105 active:scale-95 transition-transform duration-300
          "
          aria-label="Toggle Theme"
        >
          <div className="relative w-4 h-4 md:w-5 md:h-5">
            <Sun
              size={18}
              className="absolute inset-0 text-white transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100"
            />
            <Moon
              size={18}
              className="absolute inset-0 text-black transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
            />
          </div>
        </button>

      </header>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}