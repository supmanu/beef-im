
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://qogsmbivvhudqgqzeynd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iAhCkMoI24Qljlt2XWwiWg_XqHGb9ft';

async function fetchRiders() {
    console.log(`Fetching from ${SUPABASE_URL}...`);
    let allRows = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
        const start = page * pageSize;
        const end = (page + 1) * pageSize - 1;
        console.log(`Fetching range ${start}-${end}...`);

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/riders?select=*`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Range': `${start}-${end}`
                }
            });

            if (!response.ok) {
                console.error(`Error: ${response.status} ${response.statusText}`);
                // If 416 Range Not Satisfiable, we are done
                if (response.status === 416) {
                    hasMore = false;
                    break;
                }
                const text = await response.text();
                console.error(text);
                break;
            }

            const data = await response.json();
            if (data.length === 0) {
                hasMore = false;
            } else {
                allRows = allRows.concat(data);
                console.log(`Received ${data.length} rows. Total: ${allRows.length}`);
                if (data.length < pageSize) {
                    hasMore = false;
                } else {
                    page++;
                }
            }
        } catch (error) {
            console.error('Fetch failed:', error);
            break;
        }
    }

    console.log(`Finished. Total rows: ${allRows.length}`);
    const outputPath = path.resolve('nerd/references/raw/calculator_source/riders_full.json');
    fs.writeFileSync(outputPath, JSON.stringify(allRows, null, 2));
    console.log(`Saved to ${outputPath}`);

    // Convert to CSV for consistency
    if (allRows.length > 0) {
        const header = Object.keys(allRows[0]).join(',');
        const csv = [header, ...allRows.map(row => Object.values(row).map(v =>
            typeof v === 'string' && v.includes(',') ? `"${v}"` : v
        ).join(','))].join('\n');

        const csvPath = path.resolve('nerd/references/raw/calculator_source/riders_full.csv');
        fs.writeFileSync(csvPath, csv);
        console.log(`Saved CSV to ${csvPath}`);
    }
}

fetchRiders();
