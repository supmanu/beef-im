import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const prompt = Prompt({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-prompt',
  display: 'swap',
});

const sarabun = Sarabun({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-sarabun',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy",
  description: "Data. Logic. Legacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.variable} ${sarabun.variable} min-h-screen w-full bg-[#0B1D35] text-slate-200 antialiased font-sarabun selection:bg-brand-teal selection:text-white flex flex-col`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
