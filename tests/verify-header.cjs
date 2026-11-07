const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:5174/');
  await page.waitForLoadState('networkidle');
  
  let pass = 0;
  let fail = 0;
  const results = [];

  // 1. Logo slide-up on load
  // Check if there's any entrance animation for the logo
  const logo = page.locator('svg[viewbox="0 0 200 80"]');
  const logoCount = await logo.count();
  results.push({
    name: 'Logo slide-up on load',
    pass: false,
    detail: `Logo SVG found: ${logoCount > 0}. Checking for entrance animation...`
  });
  
  // Check if logoVisible state triggers any animation - inspect the header
  const header = page.locator('header.fixed');
  const headerClasses = await header.getAttribute('class');
  results.push({
    name: 'Header has transition-all',
    pass: headerClasses?.includes('transition-all'),
    detail: `Header class: ${headerClasses}`
  });

  // 2. Logo hover effect - group-hover:scale-110
  const svg = page.locator('svg.flex-shrink-0.group-hover\\:scale-110');
  const svgFound = await svg.count() > 0;
  results.push({
    name: 'Logo hover effect (group-hover:scale-110)',
    pass: svgFound,
    detail: `SVG with group-hover:scale-110 found: ${svgFound}`
  });
  
  // Try actual hover
  if (svgFound) {
    await svg.first().hover();
    const transformed = await svg.first().evaluate(el => {
      return window.getComputedStyle(el).transform;
    });
    results.push({
      name: 'Logo hover scales up',
      pass: transformed.includes('scale') || transformed.includes('matrix'),
      detail: `Transform after hover: ${transformed}`
    });
  }

  // 3. Sticky header shrink - scroll past 10px
  // Check initial state (at top)
  let scrollY = await page.evaluate(() => window.scrollY);
  const headerInitial = page.locator('header.fixed');
  const initialClasses = await headerInitial.getAttribute('class');
  
  // Scroll past 10px
  await page.evaluate(() => { window.scrollTo(0, 50); });
  await page.waitForTimeout(100);
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  const headerAfter = page.locator('header.fixed');
  const afterClasses = await headerAfter.getAttribute('class');
  
  // Check for the expected classes
  const hasWhiteBg = afterClasses?.includes('bg-white') && afterClasses?.includes('90');
  const hasBlur = afterClasses?.includes('backdrop-blur-md');
  const hasShadow = afterClasses?.includes('shadow-sm');
  const hasNavyBorder = afterClasses?.includes('border-navy-900');
  
  results.push({
    name: 'Sticky header shrink (scroll past 10px)',
    pass: hasWhiteBg && hasBlur && hasShadow && hasNavyBorder,
    detail: `Initial: ${initialClasses}, After scroll: ${afterClasses}. White/90: ${hasWhiteBg}, Blur: ${hasBlur}, Shadow: ${hasShadow}, Navy border: ${hasNavyBorder}`
  });
  
  // Reset scroll
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  // 4. No layout shift - verify header doesn't push content down
  // Check that header is fixed and content doesn't shift
  const contentArea = page.locator('main');
  const headerHeightBefore = await page.evaluate(() => {
    const header = document.querySelector('header.fixed');
    return header ? header.getBoundingClientRect().height : 0;
  });
  
  await page.evaluate(() => { window.scrollTo(0, 100); });
  await page.waitForTimeout(200);
  
  const headerHeightAfter = await page.evaluate(() => {
    const header = document.querySelector('header.fixed');
    return header ? header.getBoundingClientRect().height : 0;
  });
  
  const mainTop = await page.evaluate(() => {
    const main = document.querySelector('main');
    return main ? main.getBoundingClientRect().top : 0;
  });
  
  const layoutShift = Math.abs(headerHeightAfter - headerHeightBefore) > 1;
  results.push({
    name: 'No layout shift when header changes',
    pass: !layoutShift,
    detail: `Header height before: ${headerHeightBefore}px, after: ${headerHeightAfter}px. Main top: ${mainTop}px. Shift detected: ${layoutShift}`
  });
  
  await page.evaluate(() => window.scrollTo(0, 0));

  // 5. Take screenshots
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'tests/screenshots/header-desktop.png' });
  results.push({
    name: 'Desktop screenshot (1440px)',
    pass: true,
    detail: 'Saved to tests/screenshots/header-desktop.png'
  });
  
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(100);
  await page.screenshot({ path: 'tests/screenshots/header-phone.png' });
  results.push({
    name: 'Phone screenshot (390px)',
    pass: true,
    detail: 'Saved to tests/screenshots/header-phone.png'
  });
  
  await browser.close();

  // Print results
  console.log('\n=== WAZUKA Header Verification Results ===\n');
  let allPass = true;
  for (const r of results) {
    const status = r.pass ? 'PASS' : 'FAIL';
    if (!r.pass) allPass = false;
    console.log(`[${status}] ${r.name}`);
    console.log(`    Detail: ${r.detail}`);
    console.log();
  }
  console.log(`Overall: ${allPass ? 'ALL PASSED' : 'SOME FAILED'}`);
  
  process.exit(allPass ? 0 : 1);
})();