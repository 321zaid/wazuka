const { chromium } = require('playwright');

async function main() {
  // Connect to the local server
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 720 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Check 1: Scroll progress line
    const hasProgressLine = await page.evaluate(() => {
      // Look for a fixed element at the very top of viewport
      const found = [];
      document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' && style.top === '0px' && style.width && parseInt(style.width) > 0) {
          found.push(el.outerHTML.substring(0, 200));
        }
      });
      return found.length > 0 ? found : 'none found';
    });
    
    console.log('Has progress line indicator:', hasProgressLine);
    
    // Take desktop screenshot
    await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
    console.log('Saved desktop screenshot');
    
    // Check smooth scroll - look at header navigation
    const navLinks = await page.$$eval('nav a, .header a, .main-nav a', els => 
      els.map(e => e.getAttribute('href'))
    );
    console.log('Navigation links:', navLinks);
    
    // Check CSS scroll-behavior
    const scrollBehavior = await page.evaluate(() => {
      return document.documentElement.style.scrollBehavior;
    });
    console.log('Scroll behavior:', scrollBehavior);
    
    // Mobile viewport
    await context.setViewport({ width: 390, height: 844 });
    await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
    console.log('Saved mobile screenshot');
    
    // Scroll down a bit and check if progress line appears
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    
    const hasProgressLineAfterScroll = await page.evaluate(() => {
      const found = [];
      document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' && style.top === '0px') {
          found.push(el.outerHTML.substring(0, 200));
        }
      });
      return found.length > 0 ? found : 'none found';
    });
    
    console.log('Has progress line after scroll:', hasProgressLineAfterScroll);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  await browser.close();
}

main().catch(console.error);