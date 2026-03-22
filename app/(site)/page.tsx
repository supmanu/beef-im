
import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import FeaturedPosts from '@/components/FeaturedPosts';
import BentoGrid from '@/components/BentoGrid';
import ForensicScroll from '@/components/landing/ForensicScroll';
import GhostDemo from '@/components/landing/GhostDemo';

export const metadata: Metadata = {
  title: "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy",
  description: "Data. Logic. Legacy. Designing financial architecture and insurance systems for the sophisticated investor.",
  openGraph: {
    type: 'website',
    url: 'https://nerdwithnart.com',
    title: "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy",
    description: "Data. Logic. Legacy.",
    images: [{
      url: "https://assets.nerdwithnart.com/nwn-assets/og-background.jpg",
    }],
    siteName: "Nerd with Nart",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B1D35]">
      {/* 1. Client-Side Hero Section */}
      <HomeContent />

      {/* 2. S-Tier Animation Layers */}
      <ForensicScroll />
      <GhostDemo />

      {/* 3. Server-Side Featured Articles (Top 3) */}
      <FeaturedPosts />

      {/* 4. Static Bento Grid Navigation */}
      <BentoGrid />
    </main>
  );
}
