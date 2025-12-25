const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../nerd/references/library/NHES_VII_Full_Cleaned.md');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    [/ทาราง/g, 'ตาราง'],
    [/ความชูก/g, 'ความชุก'],
    [/สว่น/g, 'ส่วน'],
];

replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Surgical fixes completed.');
