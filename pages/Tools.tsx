import React from 'react';
import { FileText, Lock, Download, CheckSquare, Table } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Tool } from '../types';

const tools: Tool[] = [
  {
    id: 't1',
    title: 'Unit-Linked Fee Calculator 2024',
    description: 'ตาราง Excel สำหรับคำนวณ Cost of Insurance และค่าธรรมเนียมบริหารกรมธรรม์ระยะยาว',
    type: 'XLS',
    downloadUrl: '#',
    isLocked: false
  },
  {
    id: 't2',
    title: 'Medical Audit Checklist',
    description: 'รายการเอกสารที่ต้องเตรียมเมื่อโดนตรวจสอบประวัติสุขภาพย้อนหลัง',
    type: 'CHECKLIST',
    downloadUrl: '#',
    isLocked: false
  },
  {
    id: 't3',
    title: 'Advanced Estate Structuring Kit',
    description: 'พิมพ์เขียวสำหรับจัดโครงสร้างภาษีมรดกสำหรับทรัพย์สินเกิน 100 ล้านบาท',
    type: 'PDF',
    downloadUrl: '#',
    isLocked: true
  }
];

const Tools: React.FC = () => {
  const getIcon = (type: Tool['type']) => {
    switch(type) {
      case 'XLS': return <Table size={24} className="text-green-400" />;
      case 'CHECKLIST': return <CheckSquare size={24} className="text-[#F59E0B]" />;
      default: return <FileText size={24} className="text-blue-400" />;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
       <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">The Armory</h1>
            <p className="text-gray-400">
               เครื่องมือที่ผ่านการทดสอบในสนามจริง สำหรับการวางแผนที่แม่นยำ
            </p>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
             Total Assets: {tools.length} Items
          </div>
       </div>

       <div className="space-y-4">
         {tools.map((tool) => (
           <GlassCard key={tool.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#F59E0B]/30 transition-colors">
                {getIcon(tool.type)}
              </div>
              
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                    {tool.isLocked && <Lock size={14} className="text-red-400" />}
                 </div>
                 <p className="text-gray-400 text-sm">{tool.description}</p>
              </div>

              <div className="w-full sm:w-auto">
                 {tool.isLocked ? (
                   <button className="w-full sm:w-auto px-6 py-2 rounded-lg border border-white/10 text-gray-500 text-sm font-medium cursor-not-allowed bg-white/5">
                     Restricted Access
                   </button>
                 ) : (
                   <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#F59E0B] text-[#0B1D35] text-sm font-bold hover:bg-[#d97706] transition-colors flex items-center justify-center gap-2">
                     <Download size={16} />
                     <span>Download {tool.type}</span>
                   </button>
                 )}
              </div>
           </GlassCard>
         ))}
       </div>
    </div>
  );
};

export default Tools;