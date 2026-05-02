// Hand-curated article references for pillar hub pages.
// Update when notable articles are published.

export interface CuratedEntry {
  collection: 'insurance' | 'meat';
  slug: string;
  title: string;
  lede: string;
}

export const curatedInsurance: CuratedEntry[] = [
  {
    collection: 'insurance',
    slug: 'unit-linked-coi',
    title: 'Unit-Linked กับดัก COI',
    lede: 'เมื่อยูนิตลิงค์ใช้ผลตอบแทนของคุณจ่ายค่าประกัน — แล้วเงินก็หมดก่อนวัยเกษียณ',
  },
  {
    collection: 'insurance',
    slug: 'ci-rider-36-vs-108',
    title: 'CI Rider 36 vs 108 โรค',
    lede: 'คุ้มกว่าจริงไหมถ้าจ่ายเพิ่มเพื่อได้ครอบคลุม 108 โรคแทน 36 โรค',
  },
];

export const curatedMeat: CuratedEntry[] = [
  {
    collection: 'meat',
    slug: 'ribeye-reverse-sear',
    title: 'Ribeye Reverse Sear: วิทยาศาสตร์หลัง 54°C',
    lede: 'ทำไม reverse sear ถึงให้ผลดีกว่าวิธีดั้งเดิม — ข้อมูล ไม่ใช่ความเชื่อ',
  },
  {
    collection: 'meat',
    slug: 'moo-sam-chan-tod-nam-pla',
    title: 'หมูสามชั้นทอดน้ำปลา',
    lede: 'เทคนิคผิวกรอบโดยไม่ต้องพึ่งแป้ง — เหตุผลทางเคมีที่ทำให้มันได้ผล',
  },
];

// Cross-pillar bridge links (one per hub, hand-curated)
export const bridgeInsuranceToMeat = curatedMeat[0];
export const bridgeMeatToInsurance = curatedInsurance[0];
