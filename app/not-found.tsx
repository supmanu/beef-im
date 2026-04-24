'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import styles from './not-found.module.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500', '600', '800'],
  display: 'swap',
});

const beefFacts: Record<string, { text: string; source: string }[]> = {
  prime: [
    { text: "Ribeye steaks come from the rib section (ribs 6-12) and are prized for their intense marbling.", source: "USDA Beef Cuts Guide" },
    { text: "A well-marbled ribeye contains at least 30% intramuscular fat for optimal flavor.", source: "Steak Science Journal" },
    { text: "USDA Prime ribeyes must have abundant marbling throughout the entire cut.", source: "USDA Grading Standards" }
  ],
  science: [
    { text: "The Maillard reaction creates 500+ flavor compounds when searing beef at 300°F+.", source: "Food Chemistry Journal" },
    { text: "Salt breaks down muscle proteins 3x faster at room temperature.", source: "Molecular Gastronomy" },
    { text: "The ideal internal temperature for medium-rare is 130-135°F.", source: "Thermal Food Science" }
  ],
  history: [
    { text: "The first written beef recipe appears in a 4,000-year-old Babylonian cuneiform tablet.", source: "Yale Babylonian Collection" },
    { text: "The term 'steak' comes from 15th century Norse 'steik' meaning 'to roast'.", source: "Linguistic Food History" },
    { text: "The first steakhouse opened in London in 1691 (The Beef Steak Club).", source: "Culinary History Records" }
  ],
  health: [
    { text: "Grass-fed beef contains 5x more omega-3s than grain-fed, with a perfect 2:1 omega-3/6 ratio.", source: "Nutrition Journal" },
    { text: "Beef contains all 9 essential amino acids needed by humans.", source: "Human Nutrition Standards" },
    { text: "The fat in Wagyu contains more monounsaturated fats than saturated.", source: "Health & Nutrition Journal" }
  ],
  general: [
    { text: "Dry-aging beef for 28+ days breaks down collagen into gelatin, enhancing tenderness.", source: "Culinary Institute of America" },
    { text: "The most expensive steak sold was a $3,000 Wagyu ribeye in Dubai.", source: "Guinness World Records" },
    { text: "The average American consumes about 55 pounds of beef per year.", source: "USDA Consumption Data" }
  ]
};

const phrases = [
  "Seared facts, rare insights",
  "Where steak lovers chew on facts",
  "Prime cuts of knowledge",
  "Aged to perfection, like our facts",
  "Beef education, served medium-rare"
];

export default function NotFound() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const factDisplayRef = useRef<HTMLDivElement>(null);
  const factSourceRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);
  const lastTs = useRef(0);
  const accTime = useRef(0);

  const displayFact = useCallback((fact: { text: string; source: string }) => {
    const fd = factDisplayRef.current;
    const fs = factSourceRef.current;
    if (!fd || !fs) return;

    fd.classList.remove(styles.newFact);
    void fd.offsetWidth;
    fd.classList.add(styles.newFact);

    fd.textContent = fact.text;
    fs.textContent = `Source: ${fact.source}`;
  }, []);

  const showRandomFact = useCallback(() => {
    const allFacts = Object.values(beefFacts).flat();
    const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
    displayFact(randomFact);
  }, [displayFact]);

  const showSpecificFact = useCallback((category: string) => {
    const facts = beefFacts[category];
    if (facts && facts.length > 0) {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      displayFact(randomFact);
    }
  }, [displayFact]);

  useEffect(() => {
    const el = subtitleRef.current;
    if (!el) return;

    const TYPING_SPEED = 100;
    const DELETING_SPEED = 50;
    const PAUSE = 2000;

    const type = (timestamp: number) => {
      if (!lastTs.current) lastTs.current = timestamp;
      const delta = timestamp - lastTs.current;
      lastTs.current = timestamp;
      accTime.current += delta;

      const text = phrases[phraseIdx.current];
      const speed = isDeleting.current ? DELETING_SPEED : TYPING_SPEED;

      if (accTime.current >= speed) {
        accTime.current = 0;

        if (isDeleting.current) {
          el.textContent = text.substring(0, charIdx.current--);
          if (charIdx.current < 0) {
            isDeleting.current = false;
            phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
            charIdx.current = 0;
            setTimeout(() => {
              if (!document.hidden) animRef.current = requestAnimationFrame(type);
            }, PAUSE);
            return;
          }
        } else {
          el.textContent = text.substring(0, charIdx.current++);
          if (charIdx.current > text.length) {
            isDeleting.current = true;
            setTimeout(() => {
              if (!document.hidden) animRef.current = requestAnimationFrame(type);
            }, PAUSE);
            return;
          }
        }
      }

      if (!document.hidden) animRef.current = requestAnimationFrame(type);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null; }
      } else {
        if (!animRef.current) {
          lastTs.current = 0;
          accTime.current = 0;
          animRef.current = requestAnimationFrame(type);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animRef.current = requestAnimationFrame(type);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    showRandomFact();
    const interval = setInterval(showRandomFact, 8000);
    return () => clearInterval(interval);
  }, [showRandomFact]);

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <header className={styles.header}>
        <div className={styles.logo}>Beef</div>
        <p className={styles.subtitle} ref={subtitleRef}></p>
      </header>

      <div className={styles.factCard}>
        <div className={`${styles.factText} ${styles.newFact}`} ref={factDisplayRef}>
          Loading premium beef facts...
        </div>
        <div className={styles.factSource} ref={factSourceRef}></div>
      </div>

      <div className={styles.categoryGrid}>
        <div className={styles.categoryCard} onClick={() => showSpecificFact('prime')}>
          <svg className={styles.categoryIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 50L80 50M50 20L50 80" stroke="var(--primary, #2bb1bb)" strokeWidth="8"></path>
            <circle cx="30" cy="30" r="5" fill="var(--primary, #2bb1bb)"></circle>
            <circle cx="70" cy="30" r="5" fill="var(--primary, #2bb1bb)"></circle>
            <circle cx="30" cy="70" r="5" fill="var(--primary, #2bb1bb)"></circle>
            <circle cx="70" cy="70" r="5" fill="var(--primary, #2bb1bb)"></circle>
          </svg>
          <h3>Prime Cuts</h3>
          <p>Master the art of premium beef</p>
        </div>

        <div className={styles.categoryCard} onClick={() => showSpecificFact('science')}>
          <svg className={styles.categoryIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 80L80 80" stroke="var(--primary, #2bb1bb)" strokeWidth="8"></path>
            <path d="M30 20L30 60M50 20L50 60M70 20L70 60" stroke="var(--primary, #2bb1bb)" strokeWidth="4"></path>
          </svg>
          <h3>Science &amp; Grill</h3>
          <p>The chemistry behind perfect steak</p>
        </div>

        <div className={styles.categoryCard} onClick={() => showSpecificFact('history')}>
          <svg className={styles.categoryIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 30H70V70H30V30Z" stroke="var(--primary, #2bb1bb)" strokeWidth="4"></path>
            <path d="M40 40H60V60H40V40Z" stroke="var(--primary, #2bb1bb)" strokeWidth="4"></path>
          </svg>
          <h3>Beef Lore</h3>
          <p>History and culture of beef</p>
        </div>

        <div className={styles.categoryCard} onClick={() => showSpecificFact('health')}>
          <svg className={styles.categoryIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 30L60 40L80 20M20 60L40 80L60 60L80 80" stroke="var(--primary, #2bb1bb)" strokeWidth="4" strokeLinecap="round"></path>
          </svg>
          <h3>Health &amp; Beef</h3>
          <p>Nutrition facts and benefits</p>
        </div>
      </div>

      <button className={styles.ctaButton} onClick={showRandomFact}>
        Discover More Facts
      </button>

      <Link href="/" className={styles.backLink}>
        &larr; กลับไปที่ ประกันเนื้อๆ
      </Link>
    </div>
  );
}
