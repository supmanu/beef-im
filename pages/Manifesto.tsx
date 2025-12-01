import React from 'react';

const Manifesto: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex justify-center">
       <div className="max-w-3xl w-full">
          <span className="text-[#F59E0B] font-bold tracking-widest text-xs mb-4 block uppercase">The Philosophy</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
            The Summit doesn't care about your speed.
          </h1>
          
          <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed font-['Sarabun']">
             <p>
               <strong className="text-white font-bold">ผมเรียนรู้เรื่อง Compounding ไม่ใช่ในห้องเรียน...</strong><br/>
               แต่บนยอดเขา ท่ามกลางอากาศที่เบาบาง ทุกก้าวที่เดินขึ้นไปสอนให้รู้ว่า พลังที่ยิ่งใหญ่ที่สุดไม่ใช่แรงระเบิดในช่วงแรก 
               แต่คือความสม่ำเสมอในการรักษาระดับออกซิเจนในเลือด
             </p>
             <hr className="border-white/10 w-24" />
             <p>
               การเงินก็เช่นกัน เรามักหลงใหลในผลตอบแทนระยะสั้นที่หวือหวา แต่ลืมสร้าง "ฐาน" (Basecamp) 
               ที่แข็งแกร่งพอจะรับมือกับพายุเศรษฐกิจที่ไม่คาดฝัน
             </p>
             <p>
               ที่ <span className="text-white font-bold">Nerd with Nart</span> เราไม่ได้ขายตั๋วทางลัดสู่ความรวย 
               แต่เรามอบเครื่องมือ แผนที่ และเข็มทิศ ให้คุณเดินถึงยอดเขา... อย่างปลอดภัย
             </p>
          </div>

          <div className="mt-16 p-8 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl">
             <h3 className="text-xl font-bold text-[#F59E0B] mb-4">Our Core Values</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5"></span>
                 <span className="text-gray-300"><strong className="text-white">Data over Emotion:</strong> ตัดสินใจด้วยตัวเลข ไม่ใช่ความรู้สึก</span>
               </li>
               <li className="flex items-start gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5"></span>
                 <span className="text-gray-300"><strong className="text-white">Risk First:</strong> มองหาความเสี่ยงก่อนผลตอบแทนเสมอ</span>
               </li>
               <li className="flex items-start gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5"></span>
                 <span className="text-gray-300"><strong className="text-white">Long Game:</strong> เราเล่นเกมยาว เพื่อชัยชนะที่ยั่งยืน</span>
               </li>
             </ul>
          </div>
       </div>
    </div>
  );
};

export default Manifesto;