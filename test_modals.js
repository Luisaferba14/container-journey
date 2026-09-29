import puppeteer from 'puppeteer';

async function testModals() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Press 'p' to open Passport modal
  await page.keyboard.press('p');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/modal_passport.png' });

  // Close with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // Press 'd' to open Document Wallet
  await page.keyboard.press('d');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/modal_documents.png' });

  console.log('Modals captured successfully!');
  await browser.close();
}

testModals().catch(err => {
  console.error(err);
  process.exit(1);
});
