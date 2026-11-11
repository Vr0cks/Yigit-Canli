'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

type Props = {
    /** Message namespace holding this case study's copy. */
    namespace: string;
    /** Public URL of the thing that was built. */
    siteUrl: string;
};

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

export default function CaseStudy({ namespace, siteUrl }: Props) {
    const t = useTranslations(namespace);
    const locale = useLocale();

    const problem = t.raw('problem') as string[];
    const approach = t.raw('approach') as { title: string; body: string }[];
    const results = t.raw('results') as string[];
    const facts = t.raw('facts') as { value: string; label: string }[];
    const modules = t.raw('modules') as string[];

    return (
        <main className="pb-24">

            <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--primary)] alt-cizgi transition-colors mb-16"
            >
                <ArrowLeft size={14} />
                {t('back')}
            </Link>

            <article className="max-w-2xl space-y-16">

                {/* BAŞLIK */}
                <header className="space-y-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--primary)]">
                        {t('eyebrow')}
                    </p>

                    <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05] text-[var(--foreground)]">
                        {t('title')}
                    </h1>

                    <div>
                        <p className="text-[var(--foreground)]">{t('client')}</p>
                        <p className="text-sm text-[var(--muted)] mt-1">{t('clientNote')}</p>
                    </div>

                    <dl className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)] mt-8">
                        {([
                            [t('roleLabel'), t('roleValue')],
                            [t('periodLabel'), t('periodValue')],
                            [t('scopeLabel'), t('scopeValue')],
                        ] as const).map(([label, value]) => (
                            <div key={label} className="py-3 grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
                                <dt className="font-mono text-xs text-[var(--muted)]">{label}</dt>
                                <dd className="text-sm text-[var(--foreground)]">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                {/* SORUN */}
                <section>
                    <BolumBasligi no="01">{t('problemTitle')}</BolumBasligi>
                    <div className="space-y-4">
                        {problem.map((para) => (
                            <p key={para} className="text-[var(--muted)] leading-relaxed">{para}</p>
                        ))}
                    </div>
                </section>

                {/* YAKLAŞIM */}
                <section>
                    <BolumBasligi no="02">{t('approachTitle')}</BolumBasligi>
                    <ol className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
                        {approach.map((step, i) => (
                            <li key={step.title} className="py-5 grid grid-cols-[32px_1fr] gap-4">
                                <span className="font-mono text-xs text-[var(--muted)] tabular-nums pt-1">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="space-y-2">
                                    <h3 className="text-[var(--foreground)]">{step.title}</h3>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* SONUÇ */}
                <section className="space-y-8">
                    <div>
                        <BolumBasligi no="03">{t('resultTitle')}</BolumBasligi>
                        <ul className="space-y-3">
                            {results.map((result) => (
                                <li key={result} className="flex gap-3 text-[var(--muted)] leading-relaxed">
                                    <span className="text-[var(--primary)] shrink-0">—</span>
                                    <span>{result}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* İddia değil, doğrulanabilir kapsam. */}
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
                            {t('factsTitle')}
                        </p>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {facts.map((fact) => (
                                <div key={fact.label}>
                                    <dt className="text-2xl text-[var(--foreground)] tabular-nums">{fact.value}</dt>
                                    <dd className="text-xs text-[var(--muted)] leading-snug mt-1">{fact.label}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                            {t('modulesTitle')}
                        </p>
                        <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
                            {modules.join(' · ')}
                        </p>
                    </div>

                    <p className="text-xs text-[var(--muted)] leading-relaxed border-l-2 border-[var(--card-border)] pl-4">
                        {t('resultNote')}
                    </p>
                </section>

                {/* NDA */}
                <section>
                    <BolumBasligi no="04">{t('ndaTitle')}</BolumBasligi>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{t('nda')}</p>

                    <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--foreground)] hover:text-[var(--primary)] alt-cizgi transition-colors mt-6"
                    >
                        {t('visitSite')} <ArrowUpRight size={12} />
                    </a>
                </section>

                {/* KAPANIŞ */}
                <section className="border-t border-[var(--card-border)] pt-8 space-y-3">
                    <h2 className="text-[var(--foreground)]">{t('ctaTitle')}</h2>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{t('ctaBody')}</p>
                    <a
                        href="mailto:ahmetcanli1943@gmail.com"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--foreground)] hover:text-[var(--primary)] alt-cizgi transition-colors"
                    >
                        {t('ctaButton')} →
                    </a>
                </section>

            </article>
        </main>
    );
}
