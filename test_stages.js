import puppeteer from 'puppeteer';

async function testStages() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Capture Stage 1
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/stage_1.png' });

  // Click Next Stage 3 times to get to Stage 4 (Factory Stuffing)
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
  }
  // Wait for map flyTo animation
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/stage_4_factory.png' });

  // Advance to Stage 8 (CMIT Terminal)
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
  }
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/stage_8_cmit.png' });

  // Advance to Stage 12 (Eurofos customs in France)
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
  }
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: '/home/mohamed/Downloads/container_trajet/stage_12_eurofos.png' });

  console.log('Screenshots captured successfully for stages 1, 4, 8, 12!');
  await browser.close();
}

testStages().catch(err => {
  console.error(err);
  process.exit(1);
});
