'use client';

/**
 * Şu an çalan parça.
 *
 * Eskiden 280px yüksekliğinde, albüm kapağı arka plana yayılmış, gradyanlı
 * bir karttı — sayfanın geri kalanı sakinleşince tek başına bağırıyordu.
 * Artık ince bir satır: küçük kapak, iki satır yazı, sessiz bir ekolayzer.
 */

import { useEffect, useState } from 'react';
import { SiSpotify } from 'react-icons/si';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type Parca = {
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function SpotifyCard() {
  const t = useTranslations('HomePage.v2');
  const [data, setData] = useState<Parca | null>(null);

  useEffect(() => {
    const getir = async () => {
      try {
        const res = await fetch('/api/spotify');
        // 204 = şu an bir şey çalmıyor; gövde boş geliyor, JSON'a çevirme.
        if (res.status === 204 || !res.ok) {
          setData(null);
          return;
        }
        setData(await res.json());
      } catch {
        setData(null);
      }
    };

    getir();
    const sayac = setInterval(getir, 30000);
    return () => clearInterval(sayac);
  }, []);

  const caliyor = Boolean(data?.isPlaying);

  const icerik = (
    <div className="flex items-center gap-4 py-4 border-y border-[var(--card-border)]">
      <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-bg)]">
        {data?.albumImageUrl ? (
          <Image src={data.albumImageUrl} alt={data.title || ''} fill sizes="48px" className="object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[var(--muted)]">
            <SiSpotify size={18} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
          {caliyor ? t('now_playing') : t('silence')}
        </p>
        {caliyor ? (
          <p className="truncate text-[var(--foreground)]">
            {data?.title}
            <span className="text-[var(--muted)]"> · {data?.artist}</span>
          </p>
        ) : (
          <p className="truncate text-[var(--muted)]">{t('silence_note')}</p>
        )}
      </div>

      {caliyor && (
        <div className="flex items-end gap-[3px] h-4 shrink-0" aria-hidden>
          {[0, 180, 360].map((gecikme) => (
            <span
              key={gecikme}
              className="w-[3px] h-4 rounded-full bg-[var(--primary)] esitleyici-cubuk"
              style={{ animationDelay: `${gecikme}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (!caliyor || !data?.songUrl) return icerik;

  return (
    <Link href={data.songUrl} target="_blank" rel="noopener noreferrer" className="block">
      {icerik}
    </Link>
  );
}
