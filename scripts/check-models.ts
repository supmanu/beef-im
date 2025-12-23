import 'dotenv/config';

async function listModels() {
    const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!API_KEY) {
        console.error("❌ No API KEY found.");
        return;
    }

    console.log("🔍 Querying Google API for models...");

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (data.models) {
            console.log("✅ AVAILABLE MODELS (Dec 2025):");
            data.models.forEach((m: any) => {
                const name = m.name.split('/').pop();
                if (name.includes("gemini")) {
                    console.log(`- ${name}`);
                }
            });
        } else {
            console.log("⚠️ No 'models' property in response:", data);
        }

    } catch (error) {
        console.error("❌ Error fetching models:", error);
    }
}

listModels();
