
import fs from 'fs';
import path from 'path';

const rawDir = path.resolve('nerd/references/raw/calculator_source');
const bundle12 = path.join(rawDir, 'bundle_12.js');
const bundle13 = path.join(rawDir, 'bundle_13.js');

function extractCSV(filepath, varName, outputName) {
    if (!fs.existsSync(filepath)) {
        console.error(`File not found: ${filepath}`);
        return;
    }
    const content = fs.readFileSync(filepath, 'utf-8');
    // Regex to capture content between backticks after the variable declaration
    const regex = new RegExp(`export const ${varName} = \`([\\s\\S]*?)\`;`);
    const match = content.match(regex);

    if (match && match[1]) {
        const csvContent = match[1];
        const outputPath = path.join(rawDir, outputName);
        fs.writeFileSync(outputPath, csvContent);
        console.log(`Extracted ${varName} to ${outputName} (${csvContent.length} bytes)`);
    } else {
        console.error(`Could not find ${varName} in ${filepath}`);
    }
}

console.log('Starting extraction...');
extractCSV(bundle12, 'INITIAL_CSV_DATA', 'main_policies.csv');
extractCSV(bundle13, 'INITIAL_RIDER_CSV_DATA', 'riders.csv');
console.log('Extraction complete.');
