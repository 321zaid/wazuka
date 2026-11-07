const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 720 } });
  const page = await context.newPage();
  await page.goto('http://localhost:5174/');

  // Check 1: Scroll progress line
  console.log('=== Check 1: Scroll progress line ===');
  const hasProgressLine = await page.evaluate(() => {
    const progressEl = document.querySelector('.scroll-progress');
    if (progressEl) {
      const style = getComputedStyle(progressEl);
      return {
        found: true,
        element: 'scroll-progress',
        position: style.position,
        top: style.top,
        height: style.height,
        background: style.background,
        transform: style.transform,
        transition: style.transition
      };
    }
    return { found: false };
  });
  console.log(JSON.stringify(hasProgressLine));

  // Take desktop screenshot
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  console.log('Saved desktop screenshot');

  // Mobile viewport
  await context.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
  console.log('Saved mobile screenshot');

  // Scroll down and check progress line
  await page.evaluate(() => window.scrollBy(0, 500));

  const hasProgressLineAfterScroll = await page.evaluate(() => {
    const progressEl = document.querySelector('.scroll-progress');
    if (progressEl) {
      const style = getComputedStyle(progressEl);
      return { transform: style.transform, transition: style.transition };
    }
    return { found: false };
  });
  console.log('Scroll progress line after scrolling:', JSON.stringify(hasProgressLineAfterScroll));

  // Check 2: Smooth scroll
  console.log('\n=== Check 2: Smooth scroll ===');
  const scrollBehavior = await page.evaluate(() => document.documentElement.style.scrollBehavior);
  console.log('Scroll behavior:', scrollBehavior);

  // Check navigation links
  const navLinks = await page.$$eval('nav a, .header a', els =>
    els.map(e => e.getAttribute('href'))
  );
  console.log('Navigation links:', navLinks);

  await browser.close();
})();