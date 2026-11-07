const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 720 }
  });
  const page = await context.newPage();

  // Navigate to the local dev server
  await page.goto('http://localhost:5176/');

  // Check 1: Scroll progress line - look for fixed element at top with height 2px
  console.log('=== Check 1: Scroll progress line ===');
  const hasProgressLine = await page.evaluate(() => {
    // Look for .scroll-progress element
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
        transition: style.transition,
        width: style.width
      };
    }
    // Also check any fixed element at top
    const elements = document.querySelectorAll('*');
    for (const el of elements) {
      const style = getComputedStyle(el);
      if (style.position === 'fixed' && style.top === '0px' && style.height === '2px') {
        return {
          found: true,
          element: el.outerHTML.substring(0, 150),
          position: style.position,
          height: style.height
        };
      }
    }
    return { found: false };
  };

  console.log('Check 1 result:', JSON.stringify(hasProgressLine));

  // Take desktop screenshot
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  console.log('Saved desktop screenshot');

  // Check smooth scroll - CSS scroll-behavior
  console.log('\n=== Check 2: Smooth scroll ===');
  const scrollBehavior = await page.evaluate(() => {
    return document.documentElement.style.scrollBehavior;
  });
  console.log('Scroll behavior:', scrollBehavior);

  // Check navigation links
  const navLinks = await page.$$eval('nav a, .header a', els =>
    els.map(e => e.getAttribute('href'))
  );
  console.log('Navigation links:', navLinks);

  // Mobile viewport
  console.log('\n=== Check 3: Screenshots ===');
  await context.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
  console.log('Saved mobile screenshot');

  // Scroll down a bit and check progress line
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });

  const hasProgressLineAfterScroll = await page.evaluate(() => {
    const progressEl = document.querySelector('.scroll-progress');
    if (progressEl) {
      const style = getComputedStyle(progressEl);
      return {
        found: true,
        transform: style.transform,
        transition: style.transition
      };
    }
    return { found: false };
  });

  console.log('Scroll progress line after scrolling:', JSON.stringify(hasProgressLineAfterScroll));

  await browser.close();
}

main().catch(console.error);