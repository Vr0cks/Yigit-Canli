/**
 * Stadyum LED bandi. Sayfanin iki yerinde, blok gecislerinde duruyor:
 * tamamen metin, renk yok, ama surekli hareket ettigi icin sayfa olu
 * durmuyor. Kelimeler dile bagli degil, o yuzden ceviri almiyor.
 */

const KELIMELER = [
  'code',
  'snap',
  'block',
  'THKÜ ANKA',
  'center',
  'Ankara',
  '26–27 UNILIG',
];

export default function Bant({ ters = false }: { ters?: boolean }) {
  // Serit yarisina kadar kaydiginda dikissiz donmesi icin icerik iki kez basili.
  const tekTur = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {KELIMELER.map((kelime, i) => (
        <span key={`${kelime}-${i}`} className="flex items-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)] px-6">
            {kelime}
          </span>
          <span className="h-1 w-1 rounded-full bg-[var(--primary)] opacity-60" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="tam-genislik overflow-hidden border-y border-[var(--card-border)] py-4 select-none"
      role="presentation"
    >
      <div className="bant-seridi" style={ters ? { animationDirection: 'reverse' } : undefined}>
        {tekTur}
        {tekTur}
      </div>
    </div>
  );
}
