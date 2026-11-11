'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

/** Ana sayfadaki ayraçlı başlıkla aynı dil. */
function BolumBasligi({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--muted)]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-[var(--card-border)]" />
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const v2 = useTranslations('HomePage.v2');
  const locale = useLocale();

  return (
    <main className="pb-24">

      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-16"
      >
        <ArrowLeft size={14} />
        {v2('back')}
      </Link>

      <div className="max-w-2xl space-y-16">

        <section className="space-y-5">
          <h1 className="text-3xl md:text-4xl tracking-tight text-[var(--foreground)]">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-[var(--foreground)]/80">
            {t('intro')}
          </p>
        </section>

        <section>
          <BolumBasligi>{t('education.title')}</BolumBasligi>
          <div className="space-y-2">
            <h3 className="text-[var(--foreground)]">Türk Hava Kurumu Üniversitesi</h3>
            <p className="font-mono text-xs text-[var(--muted)]">
              Yönetim Bilişim Sistemleri · 2023 —
            </p>
            <p className="text-[var(--muted)] leading-relaxed pt-2">{t('education.desc')}</p>
          </div>
        </section>

        <section>
          <BolumBasligi>{t('vision.title')}</BolumBasligi>
          <dl className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
            <div className="py-5 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6">
              <dt className="font-mono text-xs text-[var(--muted)] pt-1">Clean code</dt>
              <dd className="text-[var(--muted)] leading-relaxed">{t('vision.clean_code')}</dd>
            </div>
            <div className="py-5 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-6">
              <dt className="font-mono text-xs text-[var(--muted)] pt-1">Continuous learning</dt>
              <dd className="text-[var(--muted)] leading-relaxed">{t('vision.learning')}</dd>
            </div>
          </dl>
        </section>

        <section>
          <BolumBasligi>{t('leadership.title')}</BolumBasligi>
          <blockquote className="border-l-2 border-[var(--primary)] pl-6 text-[var(--foreground)]/80 leading-relaxed">
            {t('leadership.desc')}
          </blockquote>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 font-mono text-xs text-[var(--muted)]">
            <span>{t('leadership.scout_tag')}</span>
            <span>{t('leadership.igl_tag')}</span>
            <span>{v2('team')} · {v2('position').toLowerCase()}</span>
          </div>
        </section>

      </div>
    </main>
  );
}
