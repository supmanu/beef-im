
import { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import FeaturedPosts from '@/components/FeaturedPosts';
import BentoGrid from '@/components/BentoGrid';
import ForensicScroll from '@/components/landing/ForensicScroll';
import GhostDemo from '@/components/landing/GhostDemo';

export const metadata: Metadata = {
  title: "ประกันเนื้อๆ (beef.im) | Insurance Forensics & Meat",
  description: "Insurance forensics. Meat tricks. No filler.",
  openGraph: {
    type: 'website',
    url: 'https://beef.im',
    title: "ประกันเนื้อๆ (beef.im) | Insurance Forensics & Meat",
    description: "Insurance forensics. Meat tricks. No filler.",
    images: [{
      url: "https://assets.beef.im/og-background.jpg",
    }],
    siteName: "ประกันเนื้อๆ",
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
