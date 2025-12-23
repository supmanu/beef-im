
import 'dotenv/config';
import { ctoConductor } from '../nerd/agents/cto-conductor';

async function verifyOrchestration() {
    console.log('🚀 INITIALIZING CONDUCTOR PROBE (Gemini 3.0 Pro)...');

    const response = await ctoConductor.generate([
        {
            role: 'user',
            content: "Investigate the NHES VII obesity rate using your brain tool, then ask Nart Avatar to write a 1-paragraph summary following the 'Nerd with Nart' voice dna."
        }
    ]);

    console.log('\n--- 🏛️ CONDUCTOR OUTPUT ---\n');
    console.log(response.text);
    console.log('\n--- END OF PROBE ---');

    if (response.toolCalls && response.toolCalls.length > 0) {
        console.log('\n🔧 Tools Used:', response.toolCalls.map(t => t.toolName).join(', '));
    }
}

verifyOrchestration().catch((err) => {
    console.error("❌ CONDUCTOR FAILURE:", err);
});
