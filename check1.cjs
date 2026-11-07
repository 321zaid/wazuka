const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 720 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:5176/');

  // Check for scroll progress line
  const progressEl = await page.$('.scroll-progress');
  if (progressEl) {
    const style = await page.evaluate((el) => getComputedStyle(el), progressEl);
    console.log('Found .scroll-progress element:');
    console.log('  position:', style.position);
    console.log('  top:', style.top);
    console.log('  height:', style.height);
    console.log('  background:', style.background);
    console.log('  transform:', style.transform);
    console.log('  transition:', style.transition);
    console.log('  width:', style.width);
  } else {
    console.log('.scroll-progress element NOT found');
    
    // Check for any fixed element at top with height 2px
    const els = await page.$$(('[style*="position: fixed"]'));
    for (const el of els) {
      const { outerHTML } = el;
      console.log('Found fixed element HTML:', outerHTML.substring(0, 200));
    }
  }

  // Check smooth scroll
  const scrollBehavior = await page.evaluate(() => document.documentElement.style.scrollBehavior);
  console.log('\nScroll behavior:', scrollBehavior);

  // Take screenshots
  await page.screenshot({ path: 'check-results/desktop.png', fullPage: true });
  console.log('\nSaved desktop screenshot');

  await context.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: 'check-results/mobile.png', fullPage: true });
  console.log('Saved mobile screenshot');

  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 500));
  
  const progressElAfter = await page.$('.scroll-progress');
  if (progressElAfter) {
    const styleAfter = await page.evaluate((el) => getComputedStyle(el), progressElAfter);
    console.log('\nAfter scrolling 500px:');
    console.log('  transform:', styleAfter.transform);
    console.log('  transition:', styleAfter.transition);
  }

  await browser.close();
})();