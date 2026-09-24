'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    ArrowLeft, ArrowRight, ExternalLink, Shield,
    AlertCircle, Compass, CheckCircle2, Info
} from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

type Props = {
    /** Message namespace holding this case study's copy. */
    namespace: string;
    /** Public URL of the thing that was built. */
    siteUrl: string;
};

export default function CaseStudy({ namespace, siteUrl }: Props) {
    const t = useTranslations(namespace);

    const problem = t.raw('problem') as string[];
    const approach = t.raw('approach') as { title: string; body: string }[];
    const results = t.raw('results') as string[];
    const facts = t.raw('facts') as { value: string; label: string }[];
    const modules = t.raw('modules') as string[];

    return (
        <main className="min-h-screen pb-24">

            <div className="mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm font-mono group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t('back')}
                </Link>
            </div>

            <article className="max-w-3xl mx-auto space-y-20">

                {/* HEADER */}
                <header className="space-y-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase"
                    >
                        {t('eyebrow')}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight leading-[1.15]"
                    >
                        {t('title')}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col gap-1"
                    >
                        <span className="text-lg font-semibold text-[var(--foreground)]">{t('client')}</span>
                        <span className="text-sm text-[var(--muted)]">{t('clientNote')}</span>
                    </motion.div>

                    {/* Meta strip */}
                    <motion.dl
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--card-border)] border border-[var(--card-border)] rounded-lg overflow-hidden mt-4"
                    >
                        {([
                            [t('roleLabel'), t('roleValue')],
                            [t('periodLabel'), t('periodValue')],
                            [t('scopeLabel'), t('scopeValue')],
                        ] as const).map(([label, value]) => (
                            <div key={label} className="bg-[var(--card-bg)] p-4">
                                <dt className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--muted)] mb-1.5">
                                    {label}
                                </dt>
                                <dd className="text-sm font-medium text-[var(--card-fg)] leading-snug">{value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </header>

                {/* PROBLEM */}
                <motion.section {...fadeUp} className="space-y-5">
                    <h2 className="flex items-center gap-3 text-xl font-bold text-[var(--foreground)]">
                        <AlertCircle size={20} className="text-amber-500" />
                        {t('problemTitle')}
                    </h2>
                    {problem.map((para) => (
                        <p key={para} className="text-[var(--muted)] leading-relaxed">{para}</p>
                    ))}
                </motion.section>

                {/* APPROACH */}
                <motion.section {...fadeUp} className="space-y-6">
                    <h2 className="flex items-center gap-3 text-xl font-bold text-[var(--foreground)]">
                        <Compass size={20} className="text-primary" />
                        {t('approachTitle')}
                    </h2>

                    <div className="space-y-4">
                        {approach.map((step, i) => (
                            <div
                                key={step.title}
                                className="bento-card p-6 flex gap-5 hover:shadow-lg transition-shadow duration-300"
                            >
                                <span className="text-xs font-mono font-bold text-primary shrink-0 pt-1 tabular-nums">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-[var(--card-fg)]">{step.title}</h3>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* OUTCOME */}
                <motion.section {...fadeUp} className="space-y-6">
                    <h2 className="flex items-center gap-3 text-xl font-bold text-[var(--foreground)]">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        {t('resultTitle')}
                    </h2>

                    <ul className="space-y-3">
                        {results.map((result) => (
                            <li key={result} className="flex gap-3 text-[var(--muted)] leading-relaxed">
                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-1" />
                                <span>{result}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Verifiable scope — facts, not claimed metrics. */}
                    <div className="pt-4">
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                            {t('factsTitle')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {facts.map((fact) => (
                                <div key={fact.label} className="bento-card p-5">
                                    <p className="text-2xl font-bold text-primary mb-1.5 tabular-nums">{fact.value}</p>
                                    <p className="text-xs text-[var(--muted)] leading-snug">{fact.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What the system covers, in the client's own vocabulary. */}
                    <div className="pt-2">
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                            {t('modulesTitle')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {modules.map((module) => (
                                <span
                                    key={module}
                                    className="tag-primary text-[11px] font-medium px-3 py-1.5 rounded-md"
                                >
                                    {module}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="flex gap-3 text-xs text-[var(--muted)] leading-relaxed bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--card-border)] rounded-lg p-4">
                        <Info size={14} className="shrink-0 mt-0.5" />
                        <span>{t('resultNote')}</span>
                    </p>
                </motion.section>

                {/* NDA */}
                <motion.section {...fadeUp} className="space-y-4">
                    <h2 className="flex items-center gap-3 text-xl font-bold text-[var(--foreground)]">
                        <Shield size={20} className="text-[var(--muted)]" />
                        {t('ndaTitle')}
                    </h2>
                    <p className="text-[var(--muted)] leading-relaxed text-sm">{t('nda')}</p>

                    <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline underline-offset-4"
                    >
                        <ExternalLink size={14} /> {t('visitSite')}
                    </a>
                </motion.section>

                {/* CTA */}
                <motion.section
                    {...fadeUp}
                    className="bento-card p-8 text-center space-y-4"
                >
                    <h2 className="text-xl font-bold text-[var(--card-fg)]">{t('ctaTitle')}</h2>
                    <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md mx-auto">{t('ctaBody')}</p>
                    <a
                        href="mailto:ahmetcanli1943@gmail.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-semibold rounded-md hover:opacity-90 hover:scale-[1.02] transition-all text-sm"
                    >
                        {t('ctaButton')} <ArrowRight size={16} />
                    </a>
                </motion.section>

            </article>
        </main>
    );
}
