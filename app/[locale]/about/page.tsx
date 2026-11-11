'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

/** Ana sayfadaki numarali baslikla ayni dil. */
function BolumBasligi({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 md:mb-10">
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--primary)]">
        {no}
      </span>
      <h2 className="mt-2 text-2xl md:text-4xl tracking-tight text-[var(--foreground)]">
        {children}
      </h2>
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
        className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--primary)] alt-cizgi transition-colors mb-16"
      >
        <ArrowLeft size={14} />
        {v2('back')}
      </Link>

      <div className="max-w-2xl space-y-16">

        <section className="space-y-5">
          <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] text-[var(--foreground)]">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl leading-snug yazi-yumusak">
            {t('intro')}
          </p>
        </section>

        <section>
          <BolumBasligi no="01">{t('education.title')}</BolumBasligi>
          <div className="space-y-2">
            <h3 className="text-[var(--foreground)]">Türk Hava Kurumu Üniversitesi</h3>
            <p className="font-mono text-xs text-[var(--muted)]">
              Yönetim Bilişim Sistemleri · 2023 —
            </p>
            <p className="text-[var(--muted)] leading-relaxed pt-2">{t('education.desc')}</p>
          </div>
        </section>

        <section>
          <BolumBasligi no="02">{t('vision.title')}</BolumBasligi>
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
          <BolumBasligi no="03">{t('leadership.title')}</BolumBasligi>
          <blockquote className="border-l-2 border-[var(--primary)] pl-6 yazi-yumusak leading-relaxed">
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
