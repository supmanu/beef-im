'use server';

/**
 * SOVEREIGN SHIELD: FINANCIAL LOGIC
 * Executed server-side to ensure integrity and logging capability.
 */

interface Cashflow {
    year: number; // 0-based index (0 = Start of contract)
    amount: number; // Negative = Outflow, Positive = Inflow
}

/**
 * Calculates the Internal Rate of Return (IRR) for a series of annual cashflows.
 * Uses the Newton-Raphson method.
 */
export async function calculateIRR(cashflows: Cashflow[]): Promise<{ 
    irr: number; 
    totalPaid: number; 
    totalReceived: number; 
    netProfit: number;
    verdict: string;
    status: 'success' | 'error';
    message?: string;
}> {
    try {
        // 1. Aggregate cashflows by year
        const timeline = new Map<number, number>();
        let maxYear = 0;
        let totalPaid = 0;
        let totalReceived = 0;

        cashflows.forEach(flow => {
            const current = timeline.get(flow.year) || 0;
            timeline.set(flow.year, current + flow.amount);
            if (flow.year > maxYear) maxYear = flow.year;
            
            if (flow.amount < 0) totalPaid += Math.abs(flow.amount);
            else totalReceived += flow.amount;
        });

        // 2. Build dense array for calculation
        const flows: number[] = [];
        for (let i = 0; i <= maxYear; i++) {
            flows.push(timeline.get(i) || 0);
        }

        // 3. Newton-Raphson for IRR
        // NPV = sum(flow / (1+r)^t)
        // We want r where NPV = 0
        
        let guess = 0.1; // Start with 10%
        const maxIterations = 100;
        const tolerance = 1e-6;
        
        for (let i = 0; i < maxIterations; i++) {
            let npv = 0;
            let d_npv = 0; // Derivative of NPV with respect to r

            for (let t = 0; t < flows.length; t++) {
                const flow = flows[t];
                if (flow === 0) continue;

                const discountFactor = Math.pow(1 + guess, t);
                npv += flow / discountFactor;
                
                // d(flow * (1+r)^-t)/dr = flow * -t * (1+r)^(-t-1)
                d_npv += -t * flow * Math.pow(1 + guess, -t - 1);
            }

            if (Math.abs(npv) < tolerance) {
                break;
            }

            if (d_npv === 0) {
                 return {
                    irr: 0, totalPaid, totalReceived, netProfit: totalReceived - totalPaid,
                    verdict: '', status: 'error', message: "Calculation failed (Divide by zero)"
                };
            }

            const newGuess = guess - npv / d_npv;

            // Safety brake for divergence
            if (Math.abs(newGuess) > 100) { // > 10000% IRR is unlikely
                 return {
                    irr: 0, totalPaid, totalReceived, netProfit: totalReceived - totalPaid,
                    verdict: '', status: 'error', message: "Does not converge"
                };
            }
            
            guess = newGuess;
        }

        const finalIRR = guess * 100;
        
        // 4. Generate Verdict
        let verdict = "N/A";
        if (finalIRR < 0) verdict = "🚨 Wealth Destruction Zone (ขาดทุน)";
        else if (finalIRR < 1.0) verdict = "⚠️ Below Inflation (แพ้เงินเฟ้อ)";
        else if (finalIRR < 2.0) verdict = "🏦 Bank Deposit Zone (เท่าเงินฝาก)";
        else if (finalIRR < 3.0) verdict = "🛡️ Bond Proxy (พันธบัตร)";
        else if (finalIRR < 5.0) verdict = "📈 Investment Grade (น่าลงทุน)";
        else verdict = "🚀 High Yield (ผลตอบแทนสูง)";

        return {
            irr: Number(finalIRR.toFixed(2)),
            totalPaid,
            totalReceived,
            netProfit: totalReceived - totalPaid,
            verdict,
            status: 'success'
        };

    } catch (e) {
        return {
            irr: 0, totalPaid: 0, totalReceived: 0, netProfit: 0,
            verdict: '', status: 'error', message: "Calculation Error"
        };
    }
}
