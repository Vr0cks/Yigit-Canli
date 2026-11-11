'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import SpotifyCard from '@/components/SpotifyCard';

type Fixture = { date: string; opponent: string };

type Project = {
  ad: string;
  yil: string;
  metin: string;
  site?: string;
  vaka?: string;
  kapali?: boolean;
};

/** Bölüm başlıkları — büyük puntolu başlık yerine ince bir ayraç. */
function BolumBasligi({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--muted)]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-[var(--card-border)]" />
    </div>
  );
}

export default function Home() {
  const t = useTranslations('HomePage.v2');
  const locale = useLocale();

  const fikstur = t.raw('fixtures') as Fixture[];

  const projeler: Project[] = [
    { ad: 'Karaca ERP', yil: '2025', metin: t('projects.erp'), kapali: true },
    { ad: 'Peony Collective', yil: '2025', metin: t('projects.peony'), site: 'https://www.peonycollective.com', vaka: `/${locale}/work/peony` },
    { ad: 'Karaca File Market', yil: '2024', metin: t('projects.karaca'), site: 'https://karacafilemarket.com', vaka: `/${locale}/work/karaca` },
    { ad: 'JNR VIP Transfer', yil: '2024', metin: t('projects.jnr'), site: 'https://www.jnrviptransfer.com' },
  ];

  return (
    <main className="flex flex-col gap-24 md:gap-32 pb-24">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center pt-8 md:pt-16">

        <div className="space-y-7 order-2 md:order-1">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--foreground)]">
            code, snap, block<span className="text-[var(--primary)]">.</span>
          </h1>

          <p className="font-mono text-sm text-[var(--muted)]">
            Yiğit Canlı · Ankara · {t('team')}, {t('position').toLowerCase()}
          </p>

          <p className="text-lg leading-relaxed text-[var(--foreground)]/80 max-w-lg">
            {t('intro')}
          </p>

          <a
            href="https://vr0cks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
          >
            {t('work_for')} → vr0cks.com
            <ArrowUpRight size={14} />
          </a>
        </div>

        <figure className="order-1 md:order-2 m-0">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--card-border)]">
            <Image
              src="/saha/snap.webp"
              alt={t('photo_caption')}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-mono text-xs text-[var(--muted)]">
            {t('photo_caption')}
          </figcaption>
        </figure>
      </section>

      {/* ── SAHA ─────────────────────────────────────────────────────── */}
      <section id="saha">
        <BolumBasligi>{t('field_title')}</BolumBasligi>

        <div className="grid sm:grid-cols-[minmax(0,240px)_1fr] gap-8 md:gap-12 items-start">
          {/* Video dikey çekilmiş; geniş hero yerine kendi oranında duruyor. */}
          <video
            src="/saha/anka.mp4"
            poster="/saha/anka-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full rounded-2xl border border-[var(--card-border)]"
          />

          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-sm text-[var(--foreground)]">{t('team')}</span>
              <span className="font-mono text-xs text-[var(--muted)]">{t('position')}</span>
              <a
                href="https://www.instagram.com/thkanka/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                @thkanka
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
                {t('season')}
              </p>

              <ul className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
                {fikstur.map((mac, i) => (
                  <li key={mac.opponent} className="flex items-center gap-4 py-3">
                    <span className="font-mono text-sm text-[var(--muted)] w-24 shrink-0">
                      {mac.date}
                    </span>
                    <span className="text-[var(--foreground)] flex-1">{mac.opponent}</span>
                    {i === 0 && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--primary)]">
                        {t('next_label')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-mono text-xs text-[var(--muted)] italic">{t('motto')}</p>
          </div>
        </div>
      </section>

      {/* ── YAPTIKLARIM ──────────────────────────────────────────────── */}
      <section id="work">
        <BolumBasligi>{t('work_title')}</BolumBasligi>

        <ul className="divide-y divide-[var(--card-border)] border-t border-[var(--card-border)]">
          {projeler.map((p) => (
            <li key={p.ad} className="py-8 grid md:grid-cols-[200px_1fr] gap-3 md:gap-8">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">{p.ad}</h3>
                <p className="font-mono text-xs text-[var(--muted)] mt-1">{p.yil}</p>
              </div>

              <div className="space-y-4">
                <p className="text-[var(--muted)] leading-relaxed max-w-2xl">{p.metin}</p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
                  {p.site && (
                    <a
                      href={p.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      {t('live')} <ArrowUpRight size={12} />
                    </a>
                  )}
                  {p.vaka && (
                    <Link
                      href={p.vaka}
                      className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                    >
                      {t('case_study')} →
                    </Link>
                  )}
                  {p.kapali && (
                    <span className="text-[var(--muted)]">{t('closed_source')}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── ŞU AN ────────────────────────────────────────────────────── */}
      <section>
        <SpotifyCard />
      </section>

      {/* ── ALT ──────────────────────────────────────────────────────── */}
      <footer className="pt-8 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--muted)]">{t('footer_note')}</p>

        <div className="flex items-center gap-5 font-mono text-xs">
          <a href="https://github.com/Vr0cks" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">github</a>
          <a href="https://www.linkedin.com/in/vr0cks/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">linkedin</a>
          <a href="https://www.instagram.com/ahmetcanli061906/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">instagram</a>
        </div>
      </footer>
    </main>
  );
}
