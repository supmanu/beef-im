
import { createTool } from '@mastra/core/tools';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const DATA_DIR = path.resolve(process.cwd(), 'nerd/references/raw/calculator_source');

interface PolicyRow {
  age: number;
  gender: string;
  segment: string;
  segcode: string;
  interest: number;
  benefit: number;
  type: 'main' | 'rider';
}

function parseCSV(filePath: string, type: 'main' | 'rider'): PolicyRow[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const cols = line.split(',');
    if (cols.length < 5) return null;
    return {
      age: parseInt(cols[0]),
      gender: cols[1].toLowerCase(),
      segment: cols[2],
      segcode: cols[3],
      interest: parseFloat(cols[4] || '0'),
      benefit: type === 'rider' ? parseFloat(cols[6] || '0') : 1000,
      type
    } as PolicyRow;
  }).filter((r): r is PolicyRow => r !== null);
}

export const calculatePremium = createTool({
  id: 'calculate-premium',
  description: 'Calculate insurance premiums for AIA products using exact rate tables from the Sovereign Brain. Supports both main policies and riders.',
  inputSchema: z.object({
    age: z.number().describe('Age of the client'),
    gender: z.enum(['male', 'female']).describe('Gender of the client'),
    plan_code: z.string().describe('The plan code (segcode) e.g., 20PLN, HHM5, MPCIP10, HSNM1000'),
    sum_assured: z.number().optional().describe('Sum Assured for life products or benefit amount for riders. Leave empty for fixed-benefit riders like Health Happy or HB.'),
  }),
  execute: async ({ context }) => {
    const { age, gender, plan_code, sum_assured } = context;

    try {
      const mainPolicies = parseCSV(path.join(DATA_DIR, 'main_policies.csv'), 'main');
      const riders = parseCSV(path.join(DATA_DIR, 'riders.csv'), 'rider');
      
      const match = [...mainPolicies, ...riders].find(d => 
        d.age === age && 
        d.gender === gender && 
        d.segcode === plan_code
      );

      if (!match) {
        return { error: `No pricing found for plan code "${plan_code}" at age ${age} (${gender}). Please check the plan code.` };
      }

      let premium: number;
      let calculation_method: string;

      if (match.type === 'main') {
        const sa = sum_assured || 1000000; // Default to 1M if not specified for main policies
        premium = (match.interest * sa) / 1000;
        calculation_method = `(${match.interest} * ${sa.toLocaleString()}) / 1000`;
      } else {
        // Rider logic
        if (match.benefit === 0) {
          // Flat rate (like Health Happy or Infinite Care)
          premium = match.interest;
          calculation_method = `Flat rate: ${match.interest.toLocaleString()}`;
        } else {
          // Proportional rate (like CI riders or Life riders)
          const sa = sum_assured || match.benefit;
          premium = (match.interest * sa) / match.benefit;
          calculation_method = `(${match.interest} * ${sa.toLocaleString()}) / ${match.benefit.toLocaleString()}`;
        }
      }

      return {
        plan: match.segment,
        plan_code: match.segcode,
        age,
        gender,
        requested_sum_assured: sum_assured || (match.type === 'main' ? 1000000 : (match.benefit === 0 ? 'Fixed' : match.benefit)),
        premium: Math.round(premium * 100) / 100,
        currency: 'THB',
        calculation_method,
        warning: 'Occupational Class 1 rates applied. For Class 2-4, please consult an agent.',
        source: 'Sovereign Calculator Data (Operation Surgical Strike)'
      };

    } catch (error: any) {
      return { error: `Calculation error: ${error.message}` };
    }
  },
});
