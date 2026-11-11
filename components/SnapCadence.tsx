'use client';

/**
 * Easter egg: center'ın kadansı.
 *
 * Sayfanın herhangi bir yerinde "hut" yazınca top snap edilir — ekran bir an
 * sarsılır ve gizli sayfanın bağlantısı açılır. Floating bir balon ya da
 * "ipucu" kutusu bilerek yok: bulunması gereken şey arama çubuğuyla
 * duyurulmaz.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const KADANS = 'hut';

export default function SnapCadence() {
  const locale = useLocale();
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    let tampon = '';

    const dinle = (e: KeyboardEvent) => {
      // Bir input ya da textarea'ya yazıyorsa karışma.
      const hedef = e.target as HTMLElement | null;
      if (hedef && ['INPUT', 'TEXTAREA'].includes(hedef.tagName)) return;
      if (hedef?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      tampon = (tampon + e.key.toLowerCase()).slice(-KADANS.length);
      if (tampon === KADANS) setAcik(true);
    };

    window.addEventListener('keydown', dinle);
    return () => window.removeEventListener('keydown', dinle);
  }, []);

  return (
    <AnimatePresence>
      {acik && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3 font-mono text-xs">
            <span className="text-[var(--primary)]">hut.</span>
            <Link
              href={`/${locale}/secret`}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              topu al →
            </Link>
            <button
              onClick={() => setAcik(false)}
              aria-label="kapat"
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
