import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from '../providers';
import Header from '@/components/Header';
import SnapCadence from '@/components/SnapCadence';
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: "Yiğit Canlı | Software Developer",
  description: "Tech Lead & Fullstack Developer. Next.js, React, Node.js ve React Native ile ürün geliştiriyorum.",
  openGraph: {
    title: "Yiğit Canlı | Software Developer",
    description: "Karmaşık sorunlar, temiz kodlar.",
    url: "https://yigit.vr0cks.com/en",
    siteName: "Yiğit Canlı Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yiğit Canlı Portfolio Open Graph Image",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    messages = {};
  }

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen">

        <Providers>

          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            {/* Eski 5 dakikalık ipucu balonu kaldırıldı; gizli sayfa artık
                kadansla açılıyor — duyurmadan. */}
            <SnapCadence />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-24">
              {children}
            </div>
          </NextIntlClientProvider>

        </Providers>
      </body>
    </html>
  );
}
