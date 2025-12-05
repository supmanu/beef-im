import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShieldAlert, MountainSnow, ChevronDown, Plus, Compass } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

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

const Manifesto = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    // 1. BACKGROUND LAYER FIX
    <div className="relative min-h-screen bg-[#0B1D35] text-white overflow-hidden pt-24 px-6 pb-20">

      {/* Image Layer (Placeholder URL - User to replace) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://ap-south-1.graphassets.com/cmio1jnkr03oo06o7af14hqyd/cmit8t8in13t807nzx2v9h79z')" }}
      ></div>

      {/* Black Overlay for Readability */}
      <div className="fixed inset-0 z-0 bg-black/60"></div>

      {/* Constellation Effect (On top of image/overlay) */}
      <div className="relative z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-16">

        {/* 2. NARRATIVE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="inline-block px-3 py-1 border border-amber-500/30 rounded-full bg-amber-500/10 mb-4">
            <span className="text-amber-500 text-xs font-bold tracking-[0.2em]">THE PHILOSOPHY</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-prompt font-bold leading-tight">
            The Summit doesn't care <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              about your speed.
            </span>
          </h1>

          <p className="font-sarabun text-xl text-slate-400 italic">
            "We Do Not Convince. We Confirm."
          </p>

          <div className="max-w-2xl mx-auto space-y-6 text-slate-300 font-sarabun text-lg leading-relaxed text-left md:text-center pt-8">
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

        {/* 3. THE HOLOGRAPHIC MONOLITH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative bg-[#0F2440]/60 backdrop-blur-md rounded-3xl border border-teal-500/20 overflow-hidden shadow-2xl"
        >
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
                        <h3 className={`text-xl font-prompt font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300'}`}>
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
                            <p className="font-sarabun text-slate-300 pt-2 leading-relaxed">
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

        {/* 4. FOOTER QUOTE (Fixed) */}
        <div className="text-center pb-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <Compass size={48} strokeWidth={1} className="mx-auto mb-4 text-slate-600" />
          <p className="font-prompt text-sm tracking-widest text-slate-400">BASECAMP • BANGKOK</p>
        </div>

      </div>
    </div>
  );
};

export default Manifesto;