'use client';

/**
 * Tek bir hareket: bölüm görüş alanına girince 18px aşağıdan yukarı kayıp
 * belirir, bir kez. Uçuşma yok — sayfanın omurgası var ama gürültüsü yok.
 * Kullanıcı sistemde hareketi kısmışsa hiçbir şey oynamıyor.
 */

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Saniye cinsinden gecikme — aynı ekranda sıralı belirme için. */
  gecikme?: number;
};

export default function Reveal({ children, className, gecikme = 0 }: Props) {
  const hareketKapali = useReducedMotion();

  if (hareketKapali) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: gecikme, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
