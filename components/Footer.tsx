import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative">
      {/* Gradient Fade - blends with page backgrounds */}
      <div className="absolute -top-48 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-[#0B1D35]/50 to-brand-dark pointer-events-none" />

      <div className="bg-brand-dark border-t border-brand-teal/20 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

          {/* 1. BRAND IDENTITY */}
          <h2 className="text-2xl font-bold font-['Prompt'] tracking-widest text-white mb-2">
            ประกันเนื้อๆ
          </h2>
          <p className="text-xs font-bold text-brand-amber tracking-widest mb-10">
            DATA • LOGIC • LEGACY
          </p>

          {/* 2. SOCIAL CONNECTION (Official Assets) */}
          <div className="flex gap-5 mb-12 items-center">

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/nerdwithnart"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-[#1877F2]/20 transition-all duration-300 group"
              aria-label="Facebook"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                alt="Facebook"
                className="w-6 h-6 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </a>

            {/* LINE */}
            <a
              href="#"
              className="p-3 bg-white/5 rounded-full hover:bg-[#00C300]/20 transition-all duration-300 group cursor-not-allowed"
              aria-label="LINE"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                alt="LINE"
                className="w-7 h-7 -mt-0.5 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </a>

            {/* LINKEDIN */}
            <a
              href="#"
              className="p-3 bg-white/5 rounded-full hover:bg-[#0A66C2]/20 transition-all duration-300 group cursor-not-allowed"
              aria-label="LinkedIn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                alt="LinkedIn"
                className="w-6 h-6 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </a>

            {/* X / TWITTER */}
            <a
              href="#"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 group cursor-not-allowed"
              aria-label="X"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
                alt="X"
                className="w-5 h-5 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 invert dark:invert-0"
              />
            </a>

          </div>

          {/* 3. THAI-FIRST NAVIGATION (85/15 Rule) */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold tracking-wide mb-10 text-slate-400 font-['Prompt']">
            <Link href="/" className="hover:text-brand-teal transition-colors">หน้าหลัก</Link>
            <Link href="/articles" className="hover:text-brand-teal transition-colors">คลังความรู้</Link>
            <Link href="/tools" className="hover:text-brand-teal transition-colors">คลังเครื่องมือ</Link>
            <Link href="/manifesto" className="hover:text-brand-teal transition-colors">จุดยืน</Link>
            <Link href="/contact" className="hover:text-brand-teal transition-colors">ติดต่อ</Link>
          </div>

          {/* 4. THE MANIFESTO TAGLINE (English - Legacy Quant Voice) */}
          <div className="mb-10 text-center max-w-2xl px-4">
            <p className="text-brand-teal/90 text-sm md:text-base font-['Sarabun'] leading-relaxed italic">
              "We don't sell shortcuts to wealth. <br className="hidden md:block" />
              We provide the <span className="text-brand-amber font-bold not-italic">map</span> and the <span className="text-brand-amber font-bold not-italic">compass</span> for a safe expedition."
            </p>
          </div>

          {/* 5. EDUCATIONAL DISCLAIMER (Short & Clean) */}
          <div className="max-w-3xl text-center border-t border-white/5 pt-8 px-4">
            <p className="text-slate-600 text-[10px] leading-relaxed mb-4 font-['Sarabun']">
              เนื้อหาทั้งหมดจัดทำขึ้นเพื่อการศึกษาและวิเคราะห์กลไกทางการเงินเท่านั้น มิใช่คำแนะนำทางการเงินหรือการชี้ชวนให้ลงทุน
            </p>
            <p className="text-slate-700 text-[10px]">
              © {new Date().getFullYear()} ประกันเนื้อๆ. All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
