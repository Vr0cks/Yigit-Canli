import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Peony vaka sayfasi kaldirildi; disaridan gelen eski linkler
  // olu 404 yemesin diye is listesine yonlendiriliyor.
  async redirects() {
    return [
      {
        source: '/:locale(tr|en|de)/work/peony',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/work/peony',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // --- YENİ EKLENEN KISIM BAŞLANGICI ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify sunucusuna güveniyoruz
      },
    ],
  },
  // --- YENİ EKLENEN KISIM BİTİŞİ ---
};
 
export default withNextIntl(nextConfig);