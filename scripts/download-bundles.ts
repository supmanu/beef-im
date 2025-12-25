
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
    const outputDir = path.resolve('nerd/references/raw/calculator_source');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    let bundleCount = 0;

    page.on('response', async (response) => {
        const url = response.url();
        const contentType = response.headers()['content-type'];

        if (url.startsWith('data:application/javascript')) {
            console.log(`Found data URI bundle. Saving...`);
            try {
                const buffer = await response.buffer();
                const filename = `bundle_${bundleCount}.js`;
                fs.writeFileSync(path.join(outputDir, filename), buffer);
                console.log(`Saved ${filename}`);
                bundleCount++;
            } catch (e) {
                console.error(`Failed to save data URI: ${e.message}`);
            }
        } else if (contentType && (contentType.includes('javascript') || url.endsWith('.js'))) {
            console.log(`Found remote script: ${url}`);
            try {
                // sanitize filename
                const sanitized = url.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_') || `script_${bundleCount}.js`;
                const buffer = await response.buffer();
                fs.writeFileSync(path.join(outputDir, sanitized), buffer);
                console.log(`Saved ${sanitized}`);
                bundleCount++;
            } catch (e) {
                console.error(`Failed to save script ${url}: ${e.message}`);
            }
        }
    });

    const targetUrl = 'https://premium-cal-649957826912.us-west1.run.app/';
    console.log(`Navigating to ${targetUrl}...`);

    try {
        await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });
        // Wait a bit more
        await new Promise(r => setTimeout(r, 5000));
    } catch (err) {
        console.error('Error during probe:', err);
    } finally {
        await browser.close();
        console.log(`Download finished. Saved ${bundleCount} files.`);
    }
})();
