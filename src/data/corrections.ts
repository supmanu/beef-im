export interface Correction {
  date: string;        // ISO date string e.g. "2026-05-01"
  articleSlug: string; // e.g. "insurance/unit-linked-coi"
  articleTitle: string;
  summary: string;     // one-line description of what changed
}

export const corrections: Correction[] = [
  // Add entries here as corrections are made, newest first.
  // Example:
  // {
  //   date: '2026-05-01',
  //   articleSlug: 'insurance/unit-linked-coi',
  //   articleTitle: 'Unit-linked: กับดักค่าธรรมเนียม',
  //   summary: 'แก้ตัวเลข COI ปีที่ 30 จาก 128,000 เป็น 128,400 บาท (แหล่งที่มา: TMT2017)',
  // },
];
