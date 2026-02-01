'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Terminal, ArrowRight, Github, Linkedin, Mail, Code2, Cpu, Globe, LayoutTemplate, BookOpen, Download, Calendar, Gamepad2, GitGraph, ExternalLink, Coffee, Hash, Users, Send } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl'; // Import zaten vardı, aşağıda kullanıyoruz

import SpotifyCard from '@/components/SpotifyCard';
import Chatbot from '@/components/Chatbot';
import ContactModal from '@/components/contact-modal';

const Card = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`bento-card p-6 hover:scale-[1.02] hover:shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const t = useTranslations('HomePage');

  // 1. MEVCUT DİLİ ALIYORUZ (tr, en, de)
  const locale = useLocale();

  // Modal'ın açık/kapalı durumunu kontrol eden state
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="flex flex-col gap-16 pb-20">

      {/* 1. HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20 min-h-[60vh] justify-center">

        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wide"
            style={{
              color: 'var(--status-text)',
              backgroundColor: 'var(--status-bg)',
              border: '1px solid var(--status-border)'
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--status-dot)' }}
            />
            {t('hero.status')}
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-none"
            >
              Yiğit Canlı<span className="text-primary">.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--muted)] font-medium"
            >
              {t('hero.role')}
              <br className="block md:hidden" />
              <span className="hidden md:inline"> | </span>
              <span className="text-[var(--foreground)]"> {t('hero.education')}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[var(--muted)] leading-relaxed max-w-md text-lg"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/Vr0cks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-semibold rounded-md hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg"
            >
              {t('hero.cta_projects')} <ArrowRight size={18} />
            </a>

            {/* --- GÜNCELLENEN CV BUTONU --- */}
            <a
              href={`/cv-${locale}.pdf`}
              download={`Yigit_Canli_CV_${locale.toUpperCase()}.pdf`}
              className="flex items-center gap-2 px-6 py-3 border border-[var(--card-border)] text-[var(--muted)] font-medium rounded-md hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Download size={18} /> {t('hero.cta_resume')}
            </a>

            {/* İLETİŞİM BUTONU */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 font-semibold rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer backdrop-blur-sm"
            >
              <Mail size={18} />
              {t('hero.cta_contact')}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex-1 w-full max-w-lg hidden md:block"
        >
          <div className="bento-card overflow-hidden shadow-2xl relative group h-full">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)] bg-black/5 dark:bg-white/5 relative z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-xs opacity-60 font-mono">
                <Terminal size={12} />
                <span>developer.json</span>
              </div>
              <div className="w-10" />
            </div>

            <div className="p-6 font-mono text-sm leading-7 relative z-10">
              <div className="text-purple-700 dark:text-purple-800 font-bold">
                const <span className="text-amber-600 dark:text-amber-700">portfolio</span> = <span className="text-[var(--card-fg)]">{`{`}</span>
              </div>
              <div className="pl-6">
                <span className="text-blue-600 dark:text-blue-800">name</span>: <span className="text-emerald-600 dark:text-emerald-700 font-medium">"Yiğit Canlı"</span>,
              </div>
              <div className="pl-6">
                <span className="text-blue-600 dark:text-blue-800">role</span>: <span className="text-emerald-600 dark:text-emerald-700 font-medium">"{t('developer_card.role_val')}"</span>,
              </div>
              <div className="pl-6">
                <span className="text-blue-600 dark:text-blue-800">skills</span>: <span className="text-[var(--card-fg)]">[</span>
              </div>
              <div className="pl-10 text-emerald-600 dark:text-emerald-700 font-medium">
                "Next.js", "React", "TypeScript",<br />"PostgreSQL", "Tailwind"

              </div>
              <div className="pl-6 text-[var(--card-fg)]">],</div>
              <div className="pl-6">
                <span className="text-blue-600 dark:text-blue-800">status</span>: <span className="text-orange-600 dark:text-orange-700 font-medium">"{t('developer_card.status_val')}"</span>
              </div>
              <div className="text-[var(--card-fg)]">{`};`}</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. BENTO GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2 flex flex-col justify-between min-h-[280px]" delay={0.6}>
          <div>
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Cpu size={20} />
              <h3 className="text-lg font-semibold tracking-wide uppercase">{t('about.title')}</h3>
            </div>
            <p className="text-[var(--muted)] leading-relaxed">
              {t('about.text')}
            </p>
          </div>
          <div className="flex gap-2 mt-6">
            <Link href="/about" className="text-xs font-mono text-primary hover:underline underline-offset-4 flex items-center gap-1">
              {t('about.read_more')} <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        <SpotifyCard />

        <Card className="md:col-span-1 relative overflow-hidden flex flex-col justify-between min-h-[280px] group" delay={0.8}>
          {/* Scanlines effect */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

          {/* Birthday Confetti - only shows on Nov 2 */}
          {(() => {
            const now = new Date();
            const isBirthday = now.getMonth() === 10 && now.getDate() === 2; // Nov 2
            if (isBirthday) {
              return (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    >
                      {['🎉', '🎂', '🎈', '✨', '🎊'][Math.floor(Math.random() * 5)]}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })()}

          <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-[0.03] rotate-12 pointer-events-none group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-500">
            <Gamepad2 size={140} />
          </div>

          <div className="relative z-10">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
              <span className="text-green-500 font-mono text-xs">▶</span>
              <span className="text-xs font-mono font-bold tracking-wider animate-pulse">{t('hobbies.title').toUpperCase()}</span>
              <span className="text-[10px] font-mono text-[var(--muted)]">// since 2005</span>
            </div>

            {/* Gamer title */}
            <p className="text-[var(--card-fg)] font-bold text-xl mb-1 font-mono group-hover:text-purple-500 transition-colors">
              &gt; "Half-time Gamer"
            </p>
            <p className="text-[var(--muted)] text-xs font-mono mb-2">{t('hobbies.subtitle')}</p>

            {/* Dynamic XP Bar based on birthday */}
            {(() => {
              const birthday = new Date(2005, 10, 2); // Nov 2, 2005
              const now = new Date();
              const age = now.getFullYear() - birthday.getFullYear();
              const lastBirthday = new Date(now.getFullYear(), 10, 2);
              if (now < lastBirthday) lastBirthday.setFullYear(now.getFullYear() - 1);

              const monthsSinceBirthday = (now.getMonth() - lastBirthday.getMonth() + 12) % 12 ||
                (now >= lastBirthday && now.getMonth() === 10 ? 0 :
                  ((now.getFullYear() - lastBirthday.getFullYear()) * 12 + now.getMonth() - 10 + 12) % 12);

              const xp = monthsSinceBirthday * 100;
              const maxXp = 1200;
              const level = now < new Date(now.getFullYear(), 10, 2) ? age : age;
              const isBirthday = now.getMonth() === 10 && now.getDate() === 2;

              return (
                <div className="mb-4">
                  <div className="flex justify-between text-[8px] font-mono text-[var(--muted)] mb-1">
                    <span className={isBirthday ? 'text-yellow-500 animate-pulse' : ''}>
                      LVL {level} {isBirthday && '🎂 LEVEL UP!'}
                    </span>
                    <span>XP: {xp.toLocaleString()} / {maxXp.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ${isBirthday ? 'animate-pulse' : ''}`}
                      style={{ width: `${Math.min((xp / maxXp) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Achievement badges - no hover XP */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {[
              { name: 'RPG', icon: <Hash size={10} /> },
              { name: 'FPS', icon: <Gamepad2 size={10} /> },
              { name: 'Indie', icon: <BookOpen size={10} /> }
            ].map((hobby) => (
              <div key={hobby.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-purple-500/20 rounded-md text-[var(--muted)] text-[10px] font-mono font-bold uppercase hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/40 transition-all cursor-default">
                <span className="text-purple-400">{hobby.icon}</span>
                {hobby.name}
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* 3. SELECTED PROJECTS */}
      <section id="projects" className="scroll-mt-24">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--foreground)]">
          <LayoutTemplate size={24} className="text-primary" />
          {t('projects.title')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROJECT 1 */}
          <Card className="group cursor-pointer min-h-[320px] flex flex-col justify-between relative overflow-hidden" delay={0.8}>
            <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110 duration-500">
              <Globe size={180} />
            </div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-red-500/10 rounded-lg text-red-600 dark:text-red-500 border border-red-500/20">
                  <Globe size={24} />
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                  <span>v1.0.4</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-2 text-[var(--card-fg)] group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                VR0CKS Agency
              </h4>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 font-medium">
                {t('project_desc.vrocks')}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Next.js 14', 'Framer Motion', 'Tailwind'].map((tech) => (
                  <span key={tech} className="tag-primary text-[10px] font-mono font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
              <a href="https://www.vr0cks.com/en" target="_blank" className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--card-fg)] text-[var(--card-bg)] hover:opacity-90 hover:scale-[1.02] transition-all text-xs font-bold font-mono">
                <ExternalLink size={14} /> {t('projects.live_demo')}
              </a>
              <a href="https://github.com/Vr0cks/vrocks-agency" target="_blank" className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--card-border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all text-xs font-bold font-mono text-[var(--card-fg)] group/btn">
                <GitGraph size={14} className="text-[var(--muted)] group-hover/btn:text-[var(--background)]" /> {t('projects.architecture')}
              </a>
            </div>
          </Card>

          {/* PROJECT 2 */}
          <Card className="group cursor-pointer min-h-[320px] flex flex-col justify-between relative overflow-hidden" delay={0.9}>
            <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110 duration-500">
              <Users size={180} />
            </div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-800/10 rounded-lg text-blue-700 dark:text-blue-400 border border-blue-800/20">
                  <Users size={24} />
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)] text-xs font-mono bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                  <span>Community</span>
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-2 text-[var(--card-fg)] group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                United Fenerbahçe
              </h4>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 font-medium">
                {t('project_desc.united')}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span key={tech} className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 px-2 py-1 rounded border border-blue-200 dark:border-blue-500/20 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
              <a href="https://united-fenerbah-e-fans-association.vercel.app" target="_blank" className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all text-xs font-bold font-mono">
                <ExternalLink size={14} /> {t('projects.live_demo')}
              </a>
              <a href="https://github.com/Vr0cks/United-Fenerbah-e-Fans-Association-Web-Platform" target="_blank" className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--card-border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all text-xs font-bold font-mono text-[var(--card-fg)] group/btn">
                <Code2 size={14} className="text-[var(--muted)] group-hover/btn:text-[var(--background)]" /> {t('projects.review_code')}
              </a>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[var(--card-bg)]" delay={1.0}>
          <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-500 mb-4 border border-blue-500/20">
            <span className="font-mono font-bold">01</span>
          </div>
          <h4 className="text-lg font-bold text-[var(--card-fg)] mb-2">{t('philosophy.analyze.title')}</h4>
          <p className="text-[var(--muted)] text-sm leading-relaxed font-medium">
            {t('philosophy.analyze.text')}
          </p>
        </Card>

        <Card className="bg-[var(--card-bg)]" delay={1.1}>
          <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-500 mb-4 border border-purple-500/20">
            <span className="font-mono font-bold">02</span>
          </div>
          <h4 className="text-lg font-bold text-[var(--card-fg)] mb-2">{t('philosophy.clean.title')}</h4>
          <p className="text-[var(--muted)] text-sm leading-relaxed font-medium">
            {t('philosophy.clean.text')}
          </p>
        </Card>

        <Card className="bg-[var(--card-bg)]" delay={1.2}>
          <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600 dark:text-green-500 mb-4 border border-green-500/20">
            <span className="font-mono font-bold">03</span>
          </div>
          <h4 className="text-lg font-bold text-[var(--card-fg)] mb-2">{t('philosophy.optimize.title')}</h4>
          <p className="text-[var(--muted)] text-sm leading-relaxed font-medium">
            {t('philosophy.optimize.text')}
          </p>
        </Card>
      </section>

      {/* 4. FOOTER */}
      <footer className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-[var(--card-border)] mt-12 mb-10">
        <div className="flex flex-col">
          <span className="font-bold text-[var(--foreground)] text-lg">Yiğit Canlı</span>
          <span className="text-sm text-[var(--muted)]">Software Developer</span>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0 font-mono text-sm">
          <a
            href="https://github.com/Vr0cks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ahmet-yiğit-canlı/?locale=tr_TR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ahmetcanli1943@gmail.com"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Email
          </a>
        </div>
      </footer>

      {/* --- GİZLİ MODAL --- */}
      {/* Sadece isContactOpen true olduğunda açılır */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <Chatbot />

    </main>
  );
}
