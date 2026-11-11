// Kök 404 — [locale] dışında kaldığı için çeviri sağlayıcısı yok,
// metinler bu yüzden sayfanın içinde duruyor.

import "./globals.css";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="tr" className="dark">
      <body className="antialiased min-h-screen flex items-center justify-center bg-[#0A0A0B] text-[#F2F2F0] px-6">
        <main className="w-full max-w-md space-y-8">

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#E2552F]">404</p>

          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl tracking-tight leading-[1.05]">Burada bir şey yok</h1>
            <p className="text-lg text-[#8A8A90] leading-relaxed">
              Yanlış tarafa koştun. Topu geri getirelim.
            </p>
          </div>

          <div className="h-px bg-[#1F1F22]" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
            <Link href="/tr" className="text-[#F2F2F0] hover:text-[#E2552F] transition-colors">
              ana sayfa →
            </Link>
            <a
              href="https://vr0cks.com"
              className="text-[#8A8A90] hover:text-[#E2552F] transition-colors"
            >
              iş için → vr0cks.com
            </a>
          </div>

        </main>
      </body>
    </html>
  );
}
