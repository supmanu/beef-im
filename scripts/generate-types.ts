import { generateTypes } from 'payload';
import config from '../payload-config/payload.config';
import fs from 'fs';
import path from 'path';

const generate = async () => {
    try {
        console.log('Generating types...');
        await generateTypes(config); // This might return the string or write file?
        // In V3, generateTypes usually requires 'config' object which has 'typescript.outputFile' set.
        // Our config has it set.
        console.log('Types generated successfully!');
    } catch (err) {
        console.error('Error generating types:', err);
        process.exit(1);
    }
};

generate();
