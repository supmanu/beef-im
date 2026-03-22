'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FORENSIC SCROLL: A storytelling section using GSAP ScrollTrigger.
 * Uses Horizontal Scroll and Split Text effects.
 */
const ForensicScroll: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLHeadingElement>(null);
    const textRef2 = useRef<HTMLHeadingElement>(null);
    const textRef3 = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // 1. Horizontal Scroll Animation
        const pin = gsap.fromTo(
            section,
            { x: 0 },
            {
                x: "-200vw",
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${section.offsetWidth}`,
                    // markers: true, // Set to true during debugging
                }
            }
        );

        // 2. Text Reveal Animations
        [textRef1, textRef2, textRef3].forEach((ref, index) => {
            if (ref.current) {
                gsap.fromTo(
                    ref.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: ref.current,
                            containerAnimation: pin,
                            start: "left center+=20%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }
        });

        return () => {
            pin.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const slides = [
        {
            ref: textRef1,
            title: "The Population Crisis",
            titleThai: "วิกฤตประชากร: 66 ล้าน สู่ 33 ล้าน",
            description: "ไทยกำลังเข้าสู่สังคมสูงวัยขึ้นสุดยอด ประชากรจะลดลงครึ่งหนึ่งใน 60 ปี การวางแผนมรดกจึงไม่ใช่ทางเลือก แต่คือความอยู่รอด",
            color: "from-brand-teal to-emerald-500"
        },
        {
            ref: textRef2,
            title: "The 13% Equation",
            titleThai: "คณิตศาสตร์ปัญญา: ROI 13%",
            description: "อ้างอิง Heckman Equation การลงทุนในระบบรากฐานชีวิตให้ผลตอบแทนสูงถึง 13% ต่อปี เราออกแบบเพื่อปกป้องต้นทุนมนุษย์ที่มีค่าที่สุด",
            color: "from-brand-amber to-orange-500"
        },
        {
            ref: textRef3,
            title: "Financial Oxygen",
            titleThai: "ออกซิเจนใน Death Zone",
            description: "ในยุคที่ NCDs พุ่งสูง (45% Obesity Trend) เราสร้างระบบป้องกันที่ทนทานต่อทุกสภาพอากาศ เพื่อส่งต่อมรดกและปัญญาอย่างไร้กังวล",
            color: "from-blue-500 to-indigo-600"
        }
    ];

    return (
        <div ref={triggerRef} className="overflow-hidden">
            <div 
                ref={sectionRef} 
                className="flex w-[300vw] h-screen items-center bg-[#0B1D35]"
            >
                {slides.map((slide, index) => (
                    <div 
                        key={index} 
                        className="w-screen h-full flex flex-col items-center justify-center px-12 relative"
                    >
                        {/* Background Number */}
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold text-white/5 pointer-events-none select-none">
                            0{index + 1}
                        </span>

                        <div ref={slide.ref as any} className="relative z-10 max-w-4xl text-center">
                            <span className="inline-block px-4 py-1 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-wider mb-8">
                                Strategy {index + 1}
                            </span>
                            
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tighter">
                                {slide.title}
                            </h2>
                            
                            <h3 className={`text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${slide.color} mb-8 font-prompt`}>
                                {slide.titleThai}
                            </h3>
                            
                            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed font-prompt max-w-2xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        {/* Visual Decoration */}
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${slide.color} opacity-20`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForensicScroll;
