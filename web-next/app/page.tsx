import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy",
  description: "Data. Logic. Legacy. Designing financial architecture and insurance systems for the sophisticated investor.",
  openGraph: {
    type: 'website',
    url: 'https://nerdwithnart.com',
    title: "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy",
    description: "Data. Logic. Legacy.",
    images: [{
      url: "https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit9qvyx13ln07pjg8ad4u8t",
    }],
    siteName: "Nerd with Nart",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
