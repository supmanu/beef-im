import { Prompt, Sarabun } from 'next/font/google';

export const prompt = Prompt({
    weight: ['400', '500', '700'],
    subsets: ['latin', 'thai'],
    variable: '--font-prompt',
    display: 'swap',
});

export const sarabun = Sarabun({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin', 'thai'],
    variable: '--font-sarabun',
    display: 'swap',
});
