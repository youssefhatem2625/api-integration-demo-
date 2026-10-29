import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'public', 'screenshots');
mkdirSync(outputDir, { recursive: true });

const URL = 'http://localhost:5177';

const shots = [
  { name: '01-fullpage', label: 'Full API Explorer View', scrollY: 0, fullPage: true },
  { name: '02-table', label: 'Live Data Table & Filters', scrollY: 100 },
  { name: '03-metrics', label: 'Metrics Bar & Latency', scrollY: 0 },
  { name: '04-mobile', label: 'Mobile Responsive View', scrollY: 0, mobile: true },
];

(async () => {
  console.log('📸 Taking PulseAPI screenshots...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const shot of shots) {
    const page = await browser.newPage();

    if (shot.mobile) {
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    } else {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    }

    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 1200));

    if (shot.scrollY) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), shot.scrollY);
      await new Promise((r) => setTimeout(r, 400));
    }

    const filePath = join(outputDir, `${shot.name}.png`);
    await page.screenshot({ path: filePath, fullPage: shot.fullPage || false });
    console.log(`✅ ${shot.label} → ${shot.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('\n🎉 All screenshots saved to: public/screenshots/');
})();
