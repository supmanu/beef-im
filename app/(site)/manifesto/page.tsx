'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Brain, ShieldAlert, MountainSnow, ChevronDown, Plus, Compass, TrendingUp, Users } from 'lucide-react';
import Snowstorm from '@/components/Snowstorm';
import { Metadata } from 'next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// CONTENT DATA (The Soul)
const coreValues = [
  {
    id: 'data',
    title: 'Data over Emotion',
    icon: Brain,
    desc: 'เราขจัด ความไม่สมมาตรของข้อมูล (Information Asymmetry) ด้วยตัวเลขและสถิติ เพื่อให้คุณตัดสินใจบนความจริง ไม่ใช่ความกลัว'
  },
  {
    id: 'risk',
    title: 'Risk First',
    icon: ShieldAlert,
    desc: 'เหมือนที่ Ed Viesturs กล่าวไว้: "การขึ้นสู่ยอดเขาเป็นทางเลือก แต่การกลับลงมาคือข้อบังคับ" (Getting down is mandatory) เราปิดประตูความเสี่ยงก่อนที่จะเริ่มลงทุนเสมอ'
  },
  {
    id: 'long',
    title: 'The Long Game',
    icon: MountainSnow,
    desc: 'ความมั่งคั่งไม่ใช่การวิ่งระยะสั้น (Sprint) แต่คือการรักษาสถานะให้ยืนระยะได้นานที่สุด (Endurance) เพื่อชัยชนะที่ยั่งยืน'
  }
];

export default function Manifesto() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const mathSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Split Text Reveal for Hero
    if (heroTextRef.current) {
      const chars = heroTextRef.current.innerText.split('');
      heroTextRef.current.innerText = '';
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        heroTextRef.current?.appendChild(span);
      });

      gsap.to(heroTextRef.current.children, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        delay: 0.5
      });
    }
  }, []);


  return (
    // 1. BACKGROUND LAYER FIX
    <div className="relative min-h-screen bg-[#0B1D35] text-white overflow-hidden pt-24 px-6 pb-20">

      {/* Image Layer (Placeholder URL - User to replace) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://assets.nerdwithnart.com/nwn-assets/og-background.jpg')" }}
      ></div>

      {/* Black Overlay for Readability */}
      <div className="fixed inset-0 z-0 bg-black/60"></div>

      {/* Snowstorm Effect (Falling Snow) - FIXED LAYER */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <Snowstorm windIntensity={20} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-32 md:space-y-40">

        {/* 2. NARRATIVE HEADER (Logic Wall) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="inline-block px-3 py-1 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4">
            <span className="text-amber-500 text-xs font-bold tracking-wider">THE PHILOSOPHY</span>
          </div>

          <h1 ref={heroTextRef} className="text-4xl md:text-6xl lg:text-7xl font-prompt font-bold leading-tight min-h-[120px] md:min-h-[auto]">
            The Summit doesn't care about your speed.
          </h1>

          <p className="font-sarabun text-xl text-slate-400 italic">
            "We Do Not Convince. We Confirm."
          </p>

          <div className="max-w-2xl mx-auto space-y-6 text-slate-300 font-sarabun text-lg leading-loose text-left md:text-center pt-8">
            <p>
              ผมเรียนรู้เรื่อง Compounding ไม่ใช่ในห้องเรียน... แต่บนยอดเขา ท่ามกลางอากาศที่เบาบาง
              ทุกก้าวที่เดินขึ้นไปสอนให้รู้ว่า พลังที่ยิ่งใหญ่ที่สุดไม่ใช่แรงระเบิดในช่วงแรก
              แต่คือความสม่ำเสมอในการรักษาระดับออกซิเจนในเลือด
            </p>
            <p>
              ที่ <strong className="text-white">Nerd with Nart</strong> เราไม่ได้ขายตั๋วทางลัดสู่ความรวย
              แต่เรามอบเครื่องมือ แผนที่ และเข็มทิศ ให้คุณเดินถึงยอดเขา... อย่างปลอดภัย
            </p>
          </div>
        </motion.div>

        {/* 3. MATHEMATICAL TRUTH (New Section) */}
        <div ref={mathSectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Crisis Box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900/60 backdrop-blur border border-red-500/30 p-8 md:p-10 lg:p-12 rounded-2xl relative overflow-hidden group hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-500"
          >
            {/* Holographic Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none" />

            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
              <Users size={64} className="text-red-500" />
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0 mt-2" />
                <h3 className="text-red-400 font-prompt font-bold text-2xl md:text-3xl uppercase tracking-tight leading-tight">วิกฤตประชากร</h3>
              </div>
              <span className="text-red-500/60 text-sm uppercase font-mono tracking-wider block ml-5">THE CRISIS</span>
            </div>

            <div className="text-4xl md:text-5xl font-prompt font-bold text-white mb-6 tracking-tight flex items-baseline justify-start gap-3">
              <div className="flex items-baseline gap-2">
                <span>66</span>
                <span className="text-lg font-sarabun text-slate-500 font-normal">ล้าน</span>
              </div>
              <span className="text-red-500 text-3xl mx-1 italic font-black">สู่</span>
              <div className="flex items-baseline gap-2">
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>33</motion.span>
                <span className="text-lg font-sarabun text-slate-500 font-normal">ล้าน</span>
              </div>
            </div>
            <p className="text-slate-400 font-sarabun text-lg leading-loose max-w-prose">
              ประชากรไทยจะลดลงเหลือครึ่งหนึ่งใน 60 ปีข้างหน้า (ThaiHealth Watch 2025). โครงสร้างสังคมกำลังเปลี่ยน ภาระจะตกอยู่ที่คนรุ่นต่อไปหากไร้การวางแผน
            </p>
          </motion.div>

          {/* The Solution Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-900/60 backdrop-blur border border-emerald-500/30 p-8 md:p-10 lg:p-12 rounded-2xl relative overflow-hidden group hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500"
          >
            {/* Holographic Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none" />

            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
              <TrendingUp size={64} className="text-emerald-500" />
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0 mt-2" />
                <h3 className="text-emerald-400 font-prompt font-bold text-2xl md:text-3xl uppercase tracking-tight leading-tight">ทางออกเชิงระบบ</h3>
              </div>
              <span className="text-emerald-500/60 text-sm uppercase font-mono tracking-wider block ml-5">THE SOLUTION</span>
            </div>

            <div className="text-4xl md:text-5xl font-prompt font-bold text-white mb-6 tracking-tight flex items-baseline justify-start gap-3">
              <span>ROI</span>
              <motion.span className="text-emerald-400" animate={{ textShadow: ['0 0 0px #10b981', '0 0 10px #10b981', '0 0 0px #10b981'] }} transition={{ duration: 3, repeat: Infinity }}>13%</motion.span>
            </div>
            <p className="text-slate-400 font-sarabun text-lg leading-loose max-w-prose">
              Heckman Equation ยืนยัน: การลงทุนในระบบรากฐานชีวิตมนุษย์ (Early Development) ให้ผลตอบแทนสูงที่สุด เราไม่ได้สร้างแค่พอร์ต แต่สร้างระบบชีวิต
            </p>
          </motion.div>
        </div>

        {/* 4. THE HOLOGRAPHIC MONOLITH (Refined) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-[#0F2440]/60 backdrop-blur-md rounded-3xl border border-teal-500/20 overflow-hidden shadow-2xl"
        >
          {/* Scan Line Animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.5)] z-20 pointer-events-none"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* HUD Decorations */}
          <div className="absolute top-4 left-4 text-teal-500/20"><Plus size={16} /></div>
          <div className="absolute top-4 right-4 text-teal-500/20"><Plus size={16} /></div>
          <div className="absolute bottom-4 left-4 text-teal-500/20"><Plus size={16} /></div>
          <div className="absolute bottom-4 right-4 text-teal-500/20"><Plus size={16} /></div>

          <div className="divide-y divide-teal-500/10">
            {coreValues.map((item, index) => {
              const isActive = activeCard === index;

              return (
                <motion.div
                  key={item.id}
                  className={`relative cursor-pointer transition-colors duration-300 ${isActive ? 'bg-teal-900/20' : 'hover:bg-white/5'}`}
                  onClick={() => setActiveCard(isActive ? null : index)}
                  onMouseEnter={() => setActiveCard(index)}
                  layout
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLine"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"
                    />
                  )}

                  <div className="p-6 md:p-8 flex items-start gap-6">
                    {/* ICON */}
                    <div className={`mt-1 transition-colors duration-300 ${isActive ? 'text-amber-500' : 'text-slate-500'}`}>
                      <item.icon size={32} strokeWidth={1.5} />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`text-2xl md:text-3xl font-prompt font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {item.title}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`text-slate-500 transition-transform duration-300 ${isActive ? 'rotate-180 text-amber-500' : ''}`}
                        />
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="font-sarabun text-lg leading-loose text-slate-300 pt-2">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 5. FOOTER - Extended Background with Gradient */}
        <div className="relative mt-16">
          {/* Gradient Fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1D35] via-[#0B1D35]/60 to-transparent pointer-events-none" />

          {/* Snowstorm continues */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Snowstorm windIntensity={10} />
          </div>

          {/* Footer Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center pb-12"
          >
            <div className="inline-block p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 hover:border-amber-500/30 transition-all duration-500">
              <Compass size={48} strokeWidth={1} className="mx-auto mb-4 text-slate-500" />
              <p className="font-prompt text-sm tracking-wider text-slate-400">BASECAMP • BANGKOK</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
