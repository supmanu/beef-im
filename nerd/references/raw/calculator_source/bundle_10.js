// Robust CSV line splitter that handles quoted fields containing commas
const splitCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        }
        else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        }
        else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
};
// Helper to remove quotes from string values
const cleanValue = (val) => {
    if (val && val.startsWith('"') && val.endsWith('"')) {
        return val.slice(1, -1).replace(/""/g, '"'); // Handle double quotes
    }
    return val;
};
export const parseCSV = (csvText) => {
    if (!csvText)
        return [];
    const lines = csvText.trim().split('\n');
    const data = [];
    // SMART HEADER DETECTION
    let startIndex = 0;
    let headerCols = [];
    // Check if the first line is a header
    if (lines.length > 0) {
        const firstLine = lines[0].toLowerCase();
        // Typical headers start with 'age'
        if (firstLine.startsWith('age')) {
            startIndex = 1;
            headerCols = splitCSVLine(firstLine).map(c => cleanValue(c).toLowerCase());
        }
    }
    // Determine indices from header if available
    let idxBenefit = -1;
    let idxPayTerm = -1;
    let idxCoverage = -1;
    if (headerCols.length > 0) {
        headerCols.forEach((col, idx) => {
            if (col.includes('benefit'))
                idxBenefit = idx;
            if (col.includes('years to pay'))
                idxPayTerm = idx;
            // Avoid confusion between "No of coverage years" and just "coverage" context
            if (col.includes('coverage') && !col.includes('benefit'))
                idxCoverage = idx;
        });
    }
    else {
        // Fallback defaults for legacy/headerless data
        // Main Policy Default: 6=PayTerm, 7=Coverage
        idxPayTerm = 6;
        idxCoverage = 7;
    }
    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line)
            continue;
        // Skip empty CSV rows like ",,,,,"
        if (line.replace(/,/g, '').trim() === '')
            continue;
        const cols = splitCSVLine(line);
        // Expecting at least 5 cols for basic info. 
        if (cols.length < 5)
            continue;
        const ageStr = cols[0].replace(/,/g, '');
        const age = parseInt(ageStr);
        // Skip if age is invalid (filters out bad rows)
        if (isNaN(age))
            continue;
        const interestStr = cleanValue(cols[4]).replace(/,/g, '');
        const interest = parseFloat(interestStr);
        if (isNaN(interest))
            continue;
        let benefit = 0;
        let paymentTerm = 0;
        let coveragePeriod = 99;
        // 1. Try to use detected header indices
        if (idxBenefit !== -1 && cols[idxBenefit]) {
            const val = parseFloat(cleanValue(cols[idxBenefit]).replace(/,/g, ''));
            if (!isNaN(val))
                benefit = val;
        }
        if (idxPayTerm !== -1 && cols[idxPayTerm]) {
            const val = parseFloat(cleanValue(cols[idxPayTerm]).replace(/,/g, ''));
            if (!isNaN(val) && val > 0)
                paymentTerm = val;
        }
        if (idxCoverage !== -1 && cols[idxCoverage]) {
            const val = parseFloat(cleanValue(cols[idxCoverage]).replace(/,/g, ''));
            if (!isNaN(val) && val > 0)
                coveragePeriod = val;
        }
        // 2. Fallback Heuristics if specific columns weren't explicitly found in header
        // Use column count to distinguish Rider (shorter) vs Main (longer)
        // Rider Case: Typically 7 columns (ending in Benefit)
        if (idxBenefit === -1 && cols.length === 7) {
            const val = parseFloat(cleanValue(cols[6]).replace(/,/g, ''));
            if (!isNaN(val))
                benefit = val;
        }
        // Main Policy Case: Typically 8+ columns (PayTerm at 6, Coverage at 7)
        if (idxPayTerm === -1 && cols.length >= 8) {
            const pVal = parseFloat(cleanValue(cols[6]).replace(/,/g, ''));
            if (!isNaN(pVal) && pVal > 0)
                paymentTerm = pVal;
        }
        if (idxCoverage === -1 && cols.length >= 8) {
            const cVal = parseFloat(cleanValue(cols[7]).replace(/,/g, ''));
            if (!isNaN(cVal) && cVal > 0)
                coveragePeriod = cVal;
        }
        // Generate key if missing
        const key = cleanValue(cols[5]) || `${age}-${cleanValue(cols[1])}-${cleanValue(cols[3])}-${interest}`;
        const row = {
            age: age,
            gender: cleanValue(cols[1]).toLowerCase().trim(),
            segment: cleanValue(cols[2]),
            segcode: cleanValue(cols[3]),
            interest: interest,
            key: key,
            benefit: benefit,
            paymentTerm: paymentTerm,
            coveragePeriod: coveragePeriod
        };
        data.push(row);
    }
    console.log(`[CSV Parse] Successfully parsed ${data.length} records.`);
    return data;
};
export const toCSV = (data) => {
    const header = "age,gender,segment,segcode,interest,key,Years to pay,No of coverage years,Benefit";
    const rows = data.map(row => {
        let segment = row.segment;
        if (segment.includes(',') || segment.includes('"')) {
            segment = `"${segment.replace(/"/g, '""')}"`;
        }
        const pTerm = row.paymentTerm || 0;
        const cTerm = row.coveragePeriod || 0;
        const ben = row.benefit || 0;
        return `${row.age},${row.gender},${segment},${row.segcode},${row.interest},${row.key},${pTerm},${cTerm},${ben}`;
    });
    return [header, ...rows].join('\n');
};
export const filterPolicies = (data, age, gender) => {
    return data.filter(p => p.age === age && p.gender === gender && p.interest >= 0);
};
export const getUniqueSegments = (data) => {
    const segments = new Set(data.map(d => d.segment));
    return Array.from(segments).sort();
};
