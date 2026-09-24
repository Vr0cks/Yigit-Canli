import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

// The page itself is a client component, so its metadata lives here.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CaseStudy' });

    const title = `${t('title')} | Yiğit Canlı`;
    const description = t('problem.0');

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
        },
    };
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
