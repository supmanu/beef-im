
import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting probe...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    console.log(`[REQUEST] ${request.method()} ${request.url()}`);
    request.continue();
  });

  page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'];
    const status = response.status();
    
    console.log(`[RESPONSE] ${status} ${url} (${contentType})`);

    // If it looks like an API call (JSON), let's peek at the body
    if (contentType && contentType.includes('application/json')) {
        try {
            const json = await response.json();
             // Limit logging to avoid flooding terminal
            console.log(`[JSON BODY] ${JSON.stringify(json).substring(0, 500)}...`);
        } catch (e) {
            console.log(`[JSON ERROR] Could not parse JSON for ${url}`);
        }
    }
  });

  const targetUrl = 'https://premium-cal-649957826912.us-west1.run.app/';
  console.log(`Navigating to ${targetUrl}...`);
  
  try {
      await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      console.log('Navigation complete. Waiting for any delayed requests...');
      await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
      
      // Dump page content to see if we need to interact
      const content = await page.content();
      // console.log('Page content length:', content.length);
      
      // Look for scripts
      const scriptSrcs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('script'))
          .map(s => s.src)
          .filter(s => s);
      });
      console.log('Scripts found:', scriptSrcs);

  } catch (err) {
      console.error('Error during probe:', err);
  } finally {
      await browser.close();
      console.log('Probe finished.');
  }
})();
