'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import SpotifyCard from '@/components/SpotifyCard';
import Reveal from '@/components/Reveal';
import Bant from '@/components/Bant';

type Fixture = { date: string; opponent: string };

type Project = {
  ad: string;
  yil: string;
  metin: string;
  site?: string;
  vaka?: string;
  kapali?: boolean;
};

/**
 * Bolum basligi. Eskiden 12px mono bir ayracti — sayfadaki her seyle ayni
 * boydaydi, o yuzden goz hicbir yere carpmiyordu. Artik numara kucuk,
 * baslik iri: punto sicramasi sayfanin ritmini kuruyor.
 */
function BolumBasligi({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--primary)]">
        {no}
      </span>
      <h2 className="mt-2 text-3xl md:text-5xl tracking-tight text-[var(--foreground)]">
        {children}
      </h2>
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
    <main className="flex flex-col gap-28 md:gap-40 pb-24">

      {/* ── ACILIS ───────────────────────────────────────────────────────
          Fotograf sayfayi devraliyor: tam genislik, ekran boyu, yazi
          ustune biniyor. Ustteki negatif bosluk layout dolgusunu
          (py-12 / md:py-24) iptal ediyor ki gorsel en tepeden baslasin. */}
      <section className="tam-genislik -mt-12 md:-mt-24 relative">
        <div className="relative h-[82svh] min-h-[480px] md:h-[90svh]">
          <Image
            src="/saha/snap.webp"
            alt={`${t('team')} — ${t('position')}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_28%]"
          />

          {/* Yazinin okunmasi icin alt taraf zemin rengine eriyor. */}
          <div className="absolute inset-0 acilis-perde" />

          <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
            <div className="max-w-6xl mx-auto px-6">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-4">
                Yiğit Canlı
                <span className="text-[var(--primary)]"> · </span>
                Ankara
                <span className="text-[var(--primary)]"> · </span>
                {t('team')} {t('position').toLowerCase()}
              </p>

              <h1
                className="font-mono font-bold tracking-tight leading-none text-[var(--foreground)]"
                style={{ fontSize: 'clamp(2rem, 8.2vw, 6rem)' }}
              >
                code, snap, block<span className="text-[var(--primary)]">.</span>
              </h1>
            </div>
          </div>

          {/* Asagi kayma isareti — kelime yok, sadece inen bir cizgi. */}
          <div className="absolute right-6 bottom-14 hidden md:block" aria-hidden>
            <span className="block h-12 w-px bg-[var(--primary)] kayma-cizgisi" />
          </div>
        </div>
      </section>

      <Bant />

      {/* ── GIRIS ─────────────────────────────────────────────────────── */}
      <Reveal className="max-w-3xl space-y-8">
        <p className="text-xl md:text-2xl leading-snug yazi-yumusak">
          {t('intro')}
        </p>

        <a
          href="https://vr0cks.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--muted)] hover:text-[var(--foreground)] alt-cizgi transition-colors"
        >
          {t('work_for')} → vr0cks.com
          <ArrowUpRight size={14} />
        </a>
      </Reveal>

      {/* ── SAHA ─────────────────────────────────────────────────────────
          Fikstur skorboard mantiginda: siradaki mac kor rengiyle ve
          soldan cizgiyle one cikiyor, kalani geriye cekiliyor. */}
      <Reveal>
        <section id="saha">
          <BolumBasligi no="01">{t('field_title')}</BolumBasligi>

          <div className="grid sm:grid-cols-[minmax(0,240px)_1fr] gap-8 md:gap-14 items-start">
            {/* Video dikey cekilmis; kendi oraninda duruyor. */}
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

            <div className="space-y-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-xl md:text-2xl text-[var(--foreground)]">{t('team')}</span>
                <span className="font-mono text-xs text-[var(--muted)]">{t('position')}</span>
                <a
                  href="https://www.instagram.com/thkanka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--muted)] hover:text-[var(--foreground)] alt-cizgi transition-colors"
                >
                  @thkanka
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-5">
                  {t('season')}
                </p>

                <ul className="border-t border-[var(--card-border)]">
                  {fikstur.map((mac, i) => {
                    const siradaki = i === 0;
                    return (
                      <li
                        key={mac.opponent}
                        className={`flex items-baseline gap-4 md:gap-6 py-4 border-b border-[var(--card-border)] ${
                          siradaki ? 'border-l-2 border-l-[var(--primary)] pl-4' : ''
                        }`}
                      >
                        <span
                          className={`font-mono text-sm tabular-nums w-20 shrink-0 ${
                            siradaki ? 'text-[var(--primary)]' : 'text-[var(--muted)]'
                          }`}
                        >
                          {mac.date}
                        </span>
                        <span
                          className={`flex-1 text-lg md:text-xl ${
                            siradaki ? 'text-[var(--foreground)]' : 'yazi-silik'
                          }`}
                        >
                          {mac.opponent}
                        </span>
                        {siradaki && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--primary)] shrink-0">
                            {t('next_label')}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className="font-mono text-xs text-[var(--muted)] italic">{t('motto')}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── YAPTIKLARIM ──────────────────────────────────────────────────
          Iri numaralar ve iri proje adlari — bu liste artik fikstur
          listesiyle ayni kalipta durmuyor. */}
      <Reveal>
        <section id="work">
          <BolumBasligi no="02">{t('work_title')}</BolumBasligi>

          <ol className="border-t border-[var(--card-border)]">
            {projeler.map((p, i) => (
              <li
                key={p.ad}
                className="group grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-10 md:py-12 border-b border-[var(--card-border)]"
              >
                <span className="font-mono text-4xl md:text-6xl tabular-nums leading-none select-none sira-no group-hover:text-[var(--primary)] transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="space-y-5">
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <h3 className="text-2xl md:text-3xl tracking-tight text-[var(--foreground)]">
                      {p.ad}
                    </h3>
                    <span className="font-mono text-xs text-[var(--muted)]">{p.yil}</span>
                  </div>

                  <p className="md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
                    {p.metin}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
                    {p.site && (
                      <a
                        href={p.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--primary)] alt-cizgi"
                      >
                        {t('live')} <ArrowUpRight size={12} />
                      </a>
                    )}
                    {p.vaka && (
                      <Link
                        href={p.vaka}
                        className="text-[var(--foreground)] hover:text-[var(--primary)] alt-cizgi transition-colors"
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
          </ol>
        </section>
      </Reveal>

      <Bant ters />

      {/* ── SU AN ────────────────────────────────────────────────────── */}
      <Reveal>
        <SpotifyCard />
      </Reveal>

      {/* ── ALT ──────────────────────────────────────────────────────── */}
      <footer className="pt-8 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--muted)]">{t('footer_note')}</p>

        <div className="flex items-center gap-6 font-mono text-xs">
          <a href="https://github.com/Vr0cks" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--foreground)] alt-cizgi transition-colors">github</a>
          <a href="https://www.linkedin.com/in/vr0cks/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--foreground)] alt-cizgi transition-colors">linkedin</a>
          <a href="https://www.instagram.com/ahmetcanli061906/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--foreground)] alt-cizgi transition-colors">instagram</a>
        </div>
      </footer>
    </main>
  );
}
