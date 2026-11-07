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
    
    // Check 1: Scroll progress line - look at fixed elements at top of viewport
    const progressLineInfo = await page.evaluate(() => {
      const found = [];
      document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' && style.top === '0px') {
          const rect = el.getBoundingClientRect();
          found.push({
            tag: el.tagName,
            className: el.className,
            width: rect.width,
            height: rect.height,
            computedStyle: style
          });
        }
      });
      return found;
    });
    
    console.log('Fixed top elements:', JSON.stringify(progressLineInfo.slice(0, 5), null, 2));
    
    // Take desktop screenshot
    await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
    console.log('Saved desktop screenshot');
    
    // Check smooth scroll - look at all links for scroll behavior
    const allLinks = await page.$$eval('a', els => els.map(e => e.getAttribute('href')));
    console.log('All links count:', allLinks.length);
    console.log('First 10 links:', allLinks.slice(0, 10));
    
    // Check which links are in the header
    const headerLike = await page.$$eval('header a, .nav-link, .header a, .main-nav a', els => 
      els.map(e => e.getAttribute('href'))
    );
    console.log('Header links:', headerLike);
    
    // Check CSS scroll-behavior on html element
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).getPropertyValue('scroll-behavior');
    });
    console.log('Scroll behavior:', scrollBehavior);
    
    // Check if body has scroll-margin or similar
    const bodyStyle = await page.evaluate(() => {
      return getComputedStyle(document.body);
    });
    console.log('Body overflow:', bodyStyle.overflow);
    console.log('Body position:', bodyStyle.position);
    
    // Mobile viewport - recreate context
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    await mobilePage.screenshot({ path: 'test-results/mobile.png', fullPage: true });
    console.log('Saved mobile screenshot');
    
    // Scroll down and check progress line
    await mobilePage.evaluate(() => {
      window.scrollBy(0, 500);
    });
    
    const mobileProgress = await mobilePage.evaluate(() => {
      const found = [];
      document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' && style.top === '0px') {
          found.push({
            tag: el.tagName,
            className: el.className
          });
        }
      });
      return found;
    });
    
    console.log('Mobile fixed top elements:', JSON.stringify(mobileProgress));
    
  } catch (err) {
    console.error('Error:', err.message);
    console.error(err.stack);
  }
  
  await browser.close();
}

main().catch(console.error);