
import fs from 'fs';
import path from 'path';

const dumpFile = path.resolve('probe_output_utf8.txt');

function extractBase64(content: string) {
    const regex = /data:application\/javascript;base64,([a-zA-Z0-9+/=]+)/g;
    let match;
    const bundles = [];
    while ((match = regex.exec(content)) !== null) {
        bundles.push(match[1]);
    }
    return bundles;
}

function analyze() {
    if (!fs.existsSync(dumpFile)) {
        console.error('File not found:', dumpFile);
        return;
    }

    const content = fs.readFileSync(dumpFile, 'utf-8');
    const bundles = extractBase64(content);

    console.log(`Found ${bundles.length} bundles.`);

    bundles.forEach((b64, index) => {
        try {
            const decoded = Buffer.from(b64, 'base64').toString('utf-8');

            // Heuristic to guess filename/module
            let name = `bundle_${index}`;
            if (decoded.includes('const Calculator =')) name = 'Calculator.js';
            else if (decoded.includes('export const useData')) name = 'dataService.js';
            else if (decoded.includes('export const filterPolicies')) name = 'csvUtils.js';
            else if (decoded.includes('react/jsx-runtime')) name = 'react-runtime.js';
            else if (decoded.includes('createRoot')) name = 'entry.js';
            else if (decoded.includes('lucide-react')) name = 'icons.js';

            // Look for CSV or JSON
            const csvMatches = decoded.match(/['"`][^'"`]*\.csv['"`]/g);
            const jsonMatches = decoded.match(/['"`][^'"`]*\.json['"`]/g);
            const bigObjWithInterest = decoded.match(/interest:\s*\d+(\.\d+)?/);

            console.log(`\n--- Bundle ${index}: ${name} ---`);
            if (csvMatches) console.log('CSV References:', csvMatches);
            if (jsonMatches) console.log('JSON References:', jsonMatches);
            if (bigObjWithInterest) console.log('Found "interest" key (Data candidate?)');

            if (name === 'dataService.js') {
                console.log('\n*** Content of dataService.js ***\n');
                console.log(decoded);
                console.log('\n********************************\n');
            }
            if (name === 'csvUtils.js') {
                console.log('\n*** Content of csvUtils.js ***\n');
                console.log(decoded);
                console.log('\n******************************\n');
            }
            if (decoded.includes('INITIAL_CSV_DATA') && !decoded.includes('import')) {
                console.log(`\n*** FOUND DATA BUNDLE (${name}) ***\n`);
                console.log(decoded.substring(0, 5000)); // Print up to 5000 chars
                console.log('\n... (truncated) ...\n');
            }
        } catch (e) {
            console.error(`Error decoding bundle ${index}:`, e);
        }
    });
}

analyze();
