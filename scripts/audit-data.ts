
import fs from 'fs';
import path from 'path';

// Read riders_full.csv
const ridersPath = path.resolve('nerd/references/raw/calculator_source/riders_full.csv');
const ridersData = fs.readFileSync(ridersPath, 'utf-8').split('\n').filter(line => line.trim());

console.log('=== RIDERS DATA AUDIT ===');
console.log('Total rows (including header):', ridersData.length);

const ridersHeader = ridersData[0];
console.log('Header:', ridersHeader);

// Parse ages from the 'age' column (index 1 in riders_full.csv based on header: key,age,gender,...)
const ridersAges = new Set<number>();
const ridersSegments = new Set<string>();
const ridersGenders = new Set<string>();

for (let i = 1; i < ridersData.length; i++) {
    const row = ridersData[i];
    // Simple split - age is the second column
    const parts = row.split(',');
    const age = parseInt(parts[1]);
    if (!isNaN(age)) ridersAges.add(age);
    if (parts[2]) ridersGenders.add(parts[2]);
    if (parts[3]) ridersSegments.add(parts[3].replace(/"/g, ''));
}

console.log('Age Range:', Math.min(...ridersAges), '-', Math.max(...ridersAges));
console.log('Total Unique Ages:', ridersAges.size);
console.log('Genders:', [...ridersGenders].join(', '));
console.log('Unique Segments:', ridersSegments.size);
console.log('Sample Segments:', [...ridersSegments].slice(0, 15).join(', '));

// Read main_policies.csv
const mainPath = path.resolve('nerd/references/raw/calculator_source/main_policies.csv');
const mainData = fs.readFileSync(mainPath, 'utf-8').split('\n').filter(line => line.trim());

console.log('\n=== MAIN POLICIES AUDIT ===');
console.log('Total rows (including header):', mainData.length);
console.log('Header:', mainData[0]);

const mainAges = new Set<number>();
const mainSegments = new Set<string>();

for (let i = 1; i < mainData.length; i++) {
    const row = mainData[i];
    const parts = row.split(',');
    const age = parseInt(parts[0]);
    if (!isNaN(age)) mainAges.add(age);
    if (parts[2]) mainSegments.add(parts[2]);
}

console.log('Age Range:', Math.min(...mainAges), '-', Math.max(...mainAges));
console.log('Total Unique Ages:', mainAges.size);
console.log('Unique Segments:', mainSegments.size);
console.log('Segments:', [...mainSegments].join(', '));

console.log('\n=== SUMMARY ===');
console.log('Riders: 10,706 entries expected, got:', ridersData.length - 1);
console.log('Main Policies: ~500 entries expected, got:', mainData.length - 1);
console.log('Age Coverage: 0-100 expected');
console.log('Riders Ages:', ridersAges.size, 'unique');
console.log('Main Ages:', mainAges.size, 'unique');
