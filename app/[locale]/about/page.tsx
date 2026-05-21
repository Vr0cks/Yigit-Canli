'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Code2, GraduationCap, Target, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage'); // JSON'dan veri çekecek

  return (
    <main className="min-h-screen pb-20">
      
      {/* GERİ DÖN BUTONU */}
      <div className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm font-mono group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
          Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* HEADER */}
        <section className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--muted)] leading-relaxed"
          >
            {t('intro')}
          </motion.p>
        </section>

        {/* EĞİTİM (MIS) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-primary">
            <GraduationCap size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wider">{t('education.title')}</h2>
          </div>
          <div className="bento-card p-8">
            <h3 className="text-xl font-bold text-[var(--card-fg)] mb-2">Türk Hava Kurumu Üniversitesi</h3>
            <p className="text-sm font-mono text-[var(--muted)] mb-4">Yönetim Bilişim Sistemleri (MIS) | 2020 - Present</p>
            <p className="text-[var(--muted)] leading-relaxed">
              {t('education.desc')}
            </p>
          </div>
        </motion.section>

        {/* FELSEFE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-purple-500">
            <Target size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wider">{t('vision.title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bento-card p-6">
              <Code2 className="mb-4 text-[var(--foreground)]" />
              <h3 className="font-bold mb-2 text-[var(--card-fg)]">Clean Code</h3>
              <p className="text-sm text-[var(--muted)]">{t('vision.clean_code')}</p>
            </div>
            <div className="bento-card p-6">
              <BookOpen className="mb-4 text-[var(--foreground)]" />
              <h3 className="font-bold mb-2 text-[var(--card-fg)]">Continuous Learning</h3>
              <p className="text-sm text-[var(--muted)]">{t('vision.learning')}</p>
            </div>
          </div>
        </motion.section>

        {/* LEADERSHIP */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-amber-500">
            <Shield size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wider">{t('leadership.title')}</h2>
          </div>

          <div className="bento-card p-8 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/10 blur-[60px] rounded-full pointer-events-none" />

            <blockquote className="text-lg text-[var(--card-fg)] leading-relaxed mb-6 relative z-10 italic border-l-2 border-amber-500 pl-6">
              {t('leadership.desc')}
            </blockquote>

            <div className="flex flex-wrap gap-3 relative z-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Shield size={14} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">{t('leadership.scout_tag')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <Zap size={14} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">{t('leadership.igl_tag')}</span>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}