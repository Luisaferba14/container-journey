import puppeteer from 'puppeteer';

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  // wait 2 seconds for animations/rendering
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/current_view.png' });
  console.log('Screenshot captured to current_view.png');
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
