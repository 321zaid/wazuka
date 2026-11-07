const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Vite server...');
const vite = spawn('node', ['C:\\my web\\wazuka\\node_modules\\vite\\bin\\vite.js', '--port', '5173'], {
  cwd: 'C:\\my web\\wazuka',
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: true
});

vite.stdout.on('data', (data) => {
  process.stdout.write(data);
});

vite.stderr.on('data', (data) => {
  process.stderr.write(data);
});

vite.on('close', (code) => {
  console.log('Vite process exited with code: ' + code);
});

setTimeout(async () => {
  try {
    const playwright = require('@playwright/test');
    console.log('Launching browser...');
    const browser = await playwright.chromium.launch({ headless: true });
    
    // Desktop viewport
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:5173/');
    await desktopPage.screenshot({ path: 'C:\\tmp\\desktop.png' });
    console.log('Desktop screenshot taken');
    
    // Phone viewport
    const phoneContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phonePage = await phoneContext.newPage();
    await phonePage.goto('http://localhost:5173/');
    await phonePage.screenshot({ path: 'C:\\tmp\\phone.png' });
    console.log('Phone screenshot taken');
    
    // Check console errors
    const consoleErrors = [];
    desktopPage.on('console', msg => { if (msg.type() === 'error') consoleErrors.push({ type: msg.type(), text: msg.text() }); });
    desktopPage.on('pageerror', err => consoleErrors.push({ type: 'pageerror', text: err.message }));
    phonePage.on('console', msg => { if (msg.type() === 'error') consoleErrors.push({ type: msg.type(), text: msg.text() }); });
    phonePage.on('pageerror', err => consoleErrors.push({ type: 'pageerror', text: err.message }));
    
    console.log('Console errors:', JSON.stringify(consoleErrors, null, 2));
    
    // Check body text for key elements
    const desktopText = await desktopPage.textContent('body');
    const phoneText = await phonePage.textContent('body');
    
    console.log('--- Visual Element Checks ---');
    console.log('Has WWAZUKA (desktop):', desktopText.includes('WWAZUKA'));
    console.log('Has WWAZUKA (phone):', phoneText.includes('WWAZUKA'));
    console.log('No WWAZUKA spelling mistake:', !desktopText.includes('WWAZUKA') && !phoneText.includes('WWAZUKA'));
    
    // Check for brand fonts by looking at computed styles
    const bodyFont = await desktopPage.evaluate(() => {
      const style = window.getComputedStyle(document.body, null).fontFamily;
      return style;
    });
    console.log('Body font-family:', bodyFont);
    
    const headingFont = await desktopPage.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (h1) return window.getComputedStyle(h1, null).fontFamily;
      return 'not found';
    });
    console.log('Heading h1 font-family:', headingFont);
    
    // Check for blue colors by looking at computed styles
    const bgColor = await desktopPage.evaluate(() => {
      const body = document.querySelector('body');
      if (body) return window.getComputedStyle(body, null).backgroundColor;
      return 'not found';
    });
    console.log('Body background-color:', bgColor);
    
    // Check for specific blue hex colors mentioned in the text
    const allText = await desktopPage.textContent('body');
    console.log('Contains #0B3D91:', allText.includes('#0B3D91'));
    console.log('Contains #1E63D6:', allText.includes('#1E63D6'));
    
    // Check for styled header
    const hasHeader = await desktopPage.$$('header').then(headers => headers.length > 0);
    console.log('Has styled header:', hasHeader);
    
    // Check for buttons with blue background or outlined style
    const buttons = await desktopPage.$$('button, [role=button]').then(btns => btns.length);
    console.log('Number of button elements:', buttons);
    
    // Check for product cards
    const productCards = await desktopPage.$$('.product-card, .product-grid .card, .item').then(cards => cards.length);
    console.log('Number of product cards:', productCards);
    
    // Check Tailwind utilities by looking at computed styles
    const hasTailwind = await desktopPage.evaluate(() => {
      const elements = document.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="rounded"], [class*="border"]');
      return elements.length > 0;
    });
    console.log('Has Tailwind utilities applied:', hasTailwind);
    
    // Check for white background
    const bg = await desktopPage.evaluate(() => {
      const body = document.querySelector('body');
      if (body) {
        const computed = window.getComputedStyle(body, null);
        return { backgroundColor: computed.backgroundColor, color: computed.color };
      }
      return {};
    });
    console.log('Body computed styles:', bg);
    
    await browser.close();
    console.log('\nTest complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}, 3000);