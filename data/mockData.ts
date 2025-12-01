import { Article } from '../types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Compounding Effect in Thin Air',
    excerpt: 'บนยอดเขา ท่ามกลางอากาศที่เบาบาง ทุกก้าวที่เดินขึ้นไปสอนให้รู้ว่า พลังที่ยิ่งใหญ่ที่สุดไม่ใช่แรงระเบิดในช่วงแรก',
    category: 'Philosophy',
    date: 'Oct 12, 2024',
    readTime: '8 min read',
    imageUrl: 'https://picsum.photos/id/1036/800/600',
    content: `
      <p class="mb-6">ในโลกของการลงทุน เรามักได้ยินคำว่า "ดอกเบี้ยทบต้น" หรือ Compounding Effect จนชินหู แต่ความเข้าใจของเรามักถูกจำกัดอยู่แค่ในตาราง Excel ที่ตัวเลขพุ่งขึ้นเป็นกราฟพาราโบลาสวยงาม แต่ในความเป็นจริง Compounding ไม่ใช่เรื่องของคณิตศาสตร์เพียงอย่างเดียว มันคือเรื่องของ "ความอดทน" ในสภาวะที่ยากลำบาก</p>
      
      <p class="mb-6">เมื่อคุณอยู่ที่ระดับความสูง 8,000 เมตร เหนือระดับน้ำทะเล ออกซิเจนมีเพียง 30% ของระดับปกติ ร่างกายจะเริ่มต่อต้าน ทุกก้าวที่เดินไม่ใช่แค่การก้าวขา แต่คือการต่อสู้กับสัญชาตญาณที่สั่งให้คุณหยุดพักหรือหันหลังกลับ</p>

      <div class="bridge-box my-10 p-6 bg-[#0B1D35]/50 border-l-4 border-cyan-500 rounded-r-lg">
        <h4 class="text-cyan-400 font-bold font-['Prompt'] mb-2 uppercase tracking-widest text-sm">The Bridge Logic</h4>
        <p class="italic text-gray-300">
          "การลงทุนระยะยาวก็เหมือนการปีนเขาใน Death Zone ช่วงเวลาที่ Compounding จะเริ่มทำงานอย่างมหาศาล มักจะเป็นช่วงเวลาที่ตลาดผันผวนที่สุด และเป็นช่วงเวลาที่คุณอยากจะ 'ขาย' ทิ้งมากที่สุด"
        </p>
      </div>

      <h3 class="text-2xl font-bold text-white font-['Prompt'] mb-4">Oxygen Management</h3>
      <p class="mb-6">นักปีนเขาที่เก่งกาจไม่ได้วัดกันที่ความเร็วในการวิ่งขึ้นยอด แต่คือความสามารถในการบริหารจัดการทรัพยากร (Oxygen) ให้เพียงพอทั้งขาขึ้นและขาลง ในทางการเงิน Cashflow คือออกซิเจนของคุณ</p>
      
      <p>หลายคนทุ่มเงินทั้งหมดไปกับพอร์ตหุ้นที่หวังผลตอบแทน 20% ต่อปี แต่ลืมเตรียมสภาพคล่องสำหรับวิกฤต เมื่อพายุมาถึง เขาจึงขาดอากาศหายใจและต้องถูกหามลงจากภูเขา ก่อนที่จะได้เห็นวิวที่สวยที่สุด</p>
    `
  },
  {
    id: '2',
    title: 'Unit-Linked Mechanism: Under the Hood',
    excerpt: 'เจาะลึกโครงสร้างค่าธรรมเนียม COI และวิธีการทำงานของกองทุนเมื่อตลาดผันผวน',
    category: 'Technical',
    date: 'Sep 28, 2024',
    readTime: '15 min read',
    imageUrl: 'https://picsum.photos/id/1015/800/600',
    content: `
      <p class="mb-6">Unit-Linked ไม่ใช่ยาวิเศษ และไม่ใช่ "ประกันที่คุ้มกว่า" เสมอไป มันคือเครื่องมือที่มีความซับซ้อนสูง (Sophisticated Instrument) ที่รวมเอาสองโลกที่แตกต่างกันอย่างสิ้นเชิงมาไว้ด้วยกัน: โลกแห่งการการันตี (Protection) และโลกแห่งความผันผวน (Investment)</p>
      
      <h3 class="text-2xl font-bold text-white font-['Prompt'] mb-4">The COI Drag Effect</h3>
      <p class="mb-6">หัวใจสำคัญที่ตัวแทนประกันส่วนใหญ่อาจไม่ได้บอกคุณคือ COI (Cost of Insurance) ที่เพิ่มขึ้นแบบ Exponential ตามอายุ หากคุณออกแบบพอร์ตไม่ดีพอ ผลตอบแทนจากการลงทุนอาจถูก COI กัดกินจนหมดสิ้นเมื่อคุณอายุ 60 ปี</p>

      <div class="bridge-box my-10 p-6 bg-[#0B1D35]/50 border-l-4 border-cyan-500 rounded-r-lg">
        <h4 class="text-cyan-400 font-bold font-['Prompt'] mb-2 uppercase tracking-widest text-sm">The Bridge Logic</h4>
        <p class="italic text-gray-300">
          "ลองจินตนาการว่า Unit-Linked คือรถแข่ง Formula 1 ค่า COI คือน้ำมันที่เครื่องยนต์ต้องกิน ยิ่งคุณอายุมาก (ขับเร็ว) เครื่องยิ่งกินน้ำมัน ถ้าถังน้ำมัน (มูลค่ารับซื้อคืนหน่วยลงทุน) ของคุณไม่ใหญ่พอ รถจะดับกลางทาง"
        </p>
      </div>

      <p>ดังนั้น การทำ Unit-Linked จึงต้องมีการ "Rebalance" และ "Health Check" พอร์ตอย่างสม่ำเสมอ ไม่ใช่ซื้อแล้วทิ้งไว้ 20 ปีโดยไม่ดูดำดูดี</p>
    `
  },
  {
    id: '3',
    title: 'Legacy Planning for the Next Generation',
    excerpt: 'การส่งต่อมรดกไม่ใช่แค่เรื่องของเงิน แต่คือการส่งต่อชุดความคิดและระเบียบวินัย',
    category: 'Estate',
    date: 'Sep 10, 2024',
    readTime: '10 min read',
    imageUrl: 'https://picsum.photos/id/1043/800/600',
    content: `
      <p class="mb-6">สถิติจากทั่วโลกบ่งชี้ตรงกันว่า มรดกของตระกูลมักจะสูญหายไปภายใน 3 รุ่น (Generation) สาเหตุไม่ใช่เพราะเงินเฟ้อหรือภาษี แต่เป็นเพราะ "การขาดความพร้อมของผู้รับ"</p>
      
      <p class="mb-6">การวางแผนมรดก (Estate Planning) ที่ดี จึงไม่ใช่แค่การทำพินัยกรรมหรือการโอนที่ดิน แต่คือการสร้าง "ธรรมนูญครอบครัว" และระบบกงสีที่โปร่งใส</p>

      <div class="bridge-box my-10 p-6 bg-[#0B1D35]/50 border-l-4 border-cyan-500 rounded-r-lg">
        <h4 class="text-cyan-400 font-bold font-['Prompt'] mb-2 uppercase tracking-widest text-sm">The Bridge Logic</h4>
        <p class="italic text-gray-300">
          "การให้เงินก้อนใหญ่กับคนที่บริหารเงินไม่เป็น ก็เหมือนยื่นปืนบรรจุกระสุนให้เด็ก ความหวังดีอาจกลายเป็นโศกนาฏกรรมได้"
        </p>
      </div>

      <p>เราจึงเน้นย้ำเรื่อง Structure ของการส่งต่อ เช่นการใช้ Trust (ในต่างประเทศ) หรือ Holding Company (ในไทย) เพื่อควบคุม Flow ของเงิน ไม่ให้ไหลออกเร็วเกินไป</p>
    `
  },
  {
    id: '4',
    title: 'Tax Residency Update 2024',
    excerpt: 'สรุปเกณฑ์ใหม่กรมสรรพากรเรื่องรายได้จากต่างประเทศ และผลกระทบต่อนักลงทุนไทย',
    category: 'Tax',
    date: 'Nov 01, 2024',
    readTime: '6 min read',
    imageUrl: 'https://picsum.photos/id/1048/800/600',
    content: `
      <p class="mb-6">สำหรับนักลงทุนที่มีพอร์ตหุ้นต่างประเทศ หรือมีรายได้แบบ Offshore กฎระเบียบใหม่ของปี 2024 ถือเป็นเรื่องที่ต้องจับตามองอย่างใกล้ชิด การนำเงินเข้ามาในปีภาษีเดียวกันกับที่มีรายได้ อาจทำให้คุณต้องเสียภาษีเงินได้บุคคลธรรมดาในอัตราสูงสุด</p>
      
      <div class="bridge-box my-10 p-6 bg-[#0B1D35]/50 border-l-4 border-cyan-500 rounded-r-lg">
        <h4 class="text-cyan-400 font-bold font-['Prompt'] mb-2 uppercase tracking-widest text-sm">The Bridge Logic</h4>
        <p class="italic text-gray-300">
          "ภาษีไม่ใช่ค่าปรับสำหรับคนทำผิด แต่เป็นต้นทุนสำหรับคนที่ไม่วางแผน การรู้กฎกติกา (Tax Rules) คือเครื่องมือนำทางที่ช่วยให้เราเก็บเสบียงไว้ได้มากที่สุดระหว่างการเดินทาง"
        </p>
      </div>

      <p>การวางแผนภาษีจึงไม่ใช่การเลี่ยงภาษี แต่เป็นการใช้สิทธิประโยชน์ทางกฎหมายอย่างเต็มประสิทธิภาพ เพื่อให้ความมั่งคั่งของคุณเติบโตได้อย่างยั่งยืน</p>
    `
  },
  {
    id: '5',
    title: 'Pre-Existing Condition Defense',
    excerpt: 'ทำอย่างไรเมื่อบริษัทประกันปฏิเสธเคลมด้วยเหตุผล "สภาพที่เป็นมาก่อนเอาประกันภัย"',
    category: 'Health',
    date: 'Nov 05, 2024',
    readTime: '12 min read',
    imageUrl: 'https://picsum.photos/id/1060/800/600',
    content: `
      <p class="mb-6">หนึ่งในข้อพิพาทที่พบบ่อยที่สุดคือเรื่อง "สภาพที่เป็นมาก่อนเอาประกันภัย" (Pre-existing Condition) ซึ่งบริษัทประกันมักใช้เป็นเหตุผลในการบอกล้างสัญญาหากตรวจพบประวัติสุขภาพที่ไม่ได้แถลงไว้</p>
      
      <p class="mb-6">การเตรียมตัวก่อนยื่นเคลม และการมีความรู้ความเข้าใจในเวชระเบียนของตนเอง คือเกราะป้องกันที่ดีที่สุด</p>

      <div class="bridge-box my-10 p-6 bg-[#0B1D35]/50 border-l-4 border-cyan-500 rounded-r-lg">
        <h4 class="text-cyan-400 font-bold font-['Prompt'] mb-2 uppercase tracking-widest text-sm">The Bridge Logic</h4>
        <p class="italic text-gray-300">
          "สุขภาพคือ Asset เดียวที่ไม่สามารถกู้ยืมจากใครได้ และเมื่อมันเสียหาย บางครั้งเงินทองกองเท่าภูเขาก็ซื้อคืนมาไม่ได้ การปกป้องความเสี่ยงด้านสุขภาพจึงเป็นรากฐานของพีระมิดทางการเงิน"
        </p>
      </div>

      <p>เราจะพาไปดู Case Study ของลูกค้าที่สามารถพิสูจน์ข้อเท็จจริงทางการแพทย์ จนทำให้บริษัทประกันต้องกลับมาพิจารณาจ่ายสินไหมตามสัญญา</p>
    `
  }
];