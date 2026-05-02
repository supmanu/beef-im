export interface CleaverTerm {
  term: string;
  gloss: string;
  articleSlug?: string;  // first article this term appears in, e.g. "insurance/unit-linked-coi"
  pillar: 'insurance' | 'meat';
}

export const cleaverTerms: CleaverTerm[] = [
  // Insurance
  { term: 'COI (Cost of Insurance)', gloss: 'ค่าประกันความเสี่ยงที่หักออกจากกองทุน Unit-linked ทุกเดือน เพิ่มขึ้นแบบ exponential ตามอายุ', articleSlug: 'insurance/unit-linked-coi', pillar: 'insurance' },
  { term: 'CI Rider', gloss: 'สัญญาเพิ่มเติมโรคร้ายแรงที่แนบกับกรมธรรม์หลัก ต่างจากกรมธรรม์ CI แบบสมบูรณ์', articleSlug: 'insurance/ci-rider-36-vs-108', pillar: 'insurance' },
  { term: 'ILP (Investment-Linked Plan)', gloss: 'ประกันแบบ Unit-linked — รวมการลงทุนกับความคุ้มครองไว้ในกรมธรรม์เดียว', articleSlug: 'insurance/unit-linked-coi', pillar: 'insurance' },
  { term: 'TMT2017 (Thai Mortality Table 2017)', gloss: 'ตารางมรณวิทยาของไทยที่ใช้คำนวณอัตรา COI สำหรับกรมธรรม์ประกันชีวิต', articleSlug: 'insurance/unit-linked-coi', pillar: 'insurance' },
  { term: 'Multi-Pay CI', gloss: 'ประกัน CI ที่จ่ายเงินได้หลายครั้งสำหรับโรคร้ายแรงที่ต่างกัน ไม่ใช่แค่ครั้งเดียวแล้วจบสัญญา', articleSlug: 'insurance/ci-rider-36-vs-108', pillar: 'insurance' },
  { term: 'Whole Life', gloss: 'ประกันชีวิตแบบตลอดชีพ — ให้ความคุ้มครองจนถึงอายุ 99 หรือตลอดชีวิต มีมูลค่าสะสม (Cash Value)', pillar: 'insurance' },
  { term: 'Term Insurance', gloss: 'ประกันชีวิตชั่วระยะเวลา — คุ้มครองเฉพาะช่วงอายุที่กำหนด เบี้ยถูกกว่า Whole Life มาก ไม่มีมูลค่าสะสม', pillar: 'insurance' },
  { term: 'Cash Value', gloss: 'มูลค่าเงินสด — เงินที่สะสมอยู่ในกรมธรรม์ Whole Life หรือ Endowment ที่เจ้าของสามารถถอนหรือกู้ได้', pillar: 'insurance' },
  { term: 'Surrender Value', gloss: 'มูลค่าเวนคืน — เงินที่ได้รับเมื่อยกเลิกกรมธรรม์ก่อนครบกำหนด มักต่ำกว่า Cash Value ในปีแรกๆ', pillar: 'insurance' },
  { term: 'คปภ. (OIC)', gloss: 'สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย — หน่วยงานกำกับดูแลประกันในไทย', pillar: 'insurance' },

  // Meat
  { term: 'Reverse Sear', gloss: 'วิธีปรุงเนื้อโดยอบที่อุณหภูมิต่ำก่อน แล้วจึง sear ที่ความร้อนสูงทีหลัง ได้ doneness สม่ำเสมอกว่าวิธีปกติ', articleSlug: 'meat/ribeye-reverse-sear', pillar: 'meat' },
  { term: 'Maillard Reaction', gloss: 'ปฏิกิริยาเคมีระหว่างกรดอะมิโนกับน้ำตาล ที่เกิดขึ้นเมื่อผิวเนื้อถึง ~140°C ทำให้เกิดสีน้ำตาลและกลิ่นหอม', articleSlug: 'meat/ribeye-reverse-sear', pillar: 'meat' },
  { term: 'Carryover Cooking', gloss: 'การที่เนื้อยังสุกต่อหลังเอาออกจากความร้อน เนื่องจากความร้อนที่สะสมในแกนกลาง ต้องคำนึงถึงเมื่อดู target temp', articleSlug: 'meat/ribeye-reverse-sear', pillar: 'meat' },
  { term: 'มูส้ามชั้น (Pork Belly)', gloss: 'ส่วนท้องหมูที่มีชั้นไขมันและเนื้อสลับกัน นิยมทอดน้ำมันหรือพะโล้ ไขมันหลอมตัวที่ ~68–72°C', articleSlug: 'meat/moo-sam-chan-tod-nam-pla', pillar: 'meat' },
  { term: 'Dry Brine', gloss: 'การหมักเนื้อด้วยเกลือแห้ง (ไม่มีน้ำ) ล่วงหน้า ช่วยดึงความชื้นออก แล้วดูดกลับพร้อมเกลือ ทำให้เนื้อมีรสชาติและผิวกรอบขึ้น', pillar: 'meat' },
  { term: 'Doneness', gloss: 'ระดับความสุกของเนื้อ วัดด้วยอุณหภูมิภายใน: Rare 52°C · Medium-Rare 57°C · Medium 63°C · Well-Done 71°C+', articleSlug: 'meat/ribeye-reverse-sear', pillar: 'meat' },
  { term: 'Ribeye', gloss: 'เนื้อริบอาย — ส่วนซี่โครงวัว ไขมันแทรก (marbling) สูง เหมาะกับการย่างหรือ sear เพราะไขมันให้รสชาติระหว่างปรุง', articleSlug: 'meat/ribeye-reverse-sear', pillar: 'meat' },
  { term: 'Resting', gloss: 'การพักเนื้อหลังปรุงเสร็จ 5–10 นาที ให้น้ำภายในกระจายตัว ถ้าตัดทันทีน้ำจะไหลออก เนื้อแห้ง', pillar: 'meat' },
  { term: 'Marbling', gloss: 'ไขมันแทรกในเนื้อที่มองเห็นเป็นลายหินอ่อน ยิ่งมากยิ่งนุ่มและมีรสชาติ ใช้ตัดเกรดเนื้อ Wagyu ด้วย BMS scale', pillar: 'meat' },
  { term: 'Nam Pla (น้ำปลา)', gloss: 'น้ำปลาไทย — umami liquid จากปลาหมักเกลือ ใช้ทั้งปรุงและจิ้ม กรดอะมิโน glutamate สูง ทำงานเหมือน MSG ธรรมชาติ', articleSlug: 'meat/moo-sam-chan-tod-nam-pla', pillar: 'meat' },
];

// Helper: group by first letter of term, sorted alphabetically
export function groupByLetter(terms: CleaverTerm[]) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'th'));
  const groups: Record<string, CleaverTerm[]> = {};
  for (const t of sorted) {
    const letter = t.term.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(t);
  }
  return groups;
}
