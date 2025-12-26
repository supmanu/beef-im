
import puppeteer from 'puppeteer';

async function probe() {
  console.log('🚀 Launching Probe...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    console.log('🌐 Navigating to target...');
    await page.goto('https://nongfaa.com/financial-calculators', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    console.log('👀 Extracting content...');
    
    // Get page title
    const title = await page.title();
    console.log(`\nTITLE: ${title}\n`);

    // Get all headings to identify tools
    const headings = await page.evaluate(() => {
      const hTags = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      return hTags.map(h => h.innerText.trim()).filter(t => t.length > 0);
    });

    console.log('HEADINGS FOUND:');
    headings.forEach(h => console.log(`- ${h}`));

    // Get full text (truncated)
    const text = await page.evaluate(() => document.body.innerText);
    console.log('\n--- BODY TEXT SAMPLE ---');
    console.log(text.substring(0, 2000));
    
  } catch (error) {
    console.error('❌ Probe failed:', error);
  } finally {
    await browser.close();
    console.log('\n✅ Probe Complete.');
  }
}

probe();
