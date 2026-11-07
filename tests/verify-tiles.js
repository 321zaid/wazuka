const { spawn } = require('child_process');
const { test, expect } = require('@playwright/test');

const browser = process.argv[2] || 'chromium';

// Start vite preview server
const vite = spawn('npm', ['run', 'preview'], {
  cwd: 'C:\\my web\\wazuka',
  stdio: 'pipe',
  shell: true
});

vite.stdout.on('data', (data) => {
  process.stdout.write(data.toString());
});

vite.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
});

vite.on('close', (code) => {
  process.exit(code);
});

// Wait for server to be ready
setTimeout(async () => {
  const { chromium } = require('playwright');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');
  
  // 1. Check category tiles
  const categoryTiles = page.locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 .group.block');
  const tileCount = await categoryTiles.count();
  console.log(`Number of category tiles: ${tileCount}`);
  expect(tileCount).toBe(6);
  
  // 2. Check SVG icons are present
  const svgs = page.locator('svg[fill="none"]');
  const svgCount = await svgs.count();
  console.log(`Number of SVGs: ${svgCount}`);
  expect(svgCount).toBeGreaterThan(0);
  
  // 3. Check hover effects - scale up
  const firstTile = categoryTiles.first();
  const tileClass = await firstTile.getAttribute('class');
  console.log(`Tile has group-hover:scale-105: ${tileClass?.includes('group-hover:scale-105')}`);
  expect(tileClass).toContain('group-hover:scale-105');
  
  // 4. Check color classes
  expect(tileClass).toContain('bg-[' + '--color-blue-50' + ']');
  expect(tileClass).toContain('border-navy-900/5');
  
  // 5. Check responsive grid - resize to phone
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForLoadState('networkidle');
  
  const grid = page.locator('.grid');
  const computedStyle = await grid.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('grid-template-columns');
  });
  console.log(`Grid template columns at 390px: ${computedStyle}`);
  
  // 6. Take screenshots
  await page.screenshot({ path: 'tests/screenshots/category-desktop.png', width: 1440, height: 900 });
  console.log('Desktop screenshot taken');
  
  await page.screenshot({ path: 'tests/screenshots/category-phone.png', width: 390, height: 844 });
  console.log('Phone screenshot taken');
  
  console.log('All checks completed!');
  
  await browser.close();
  process.exit(0);
}, 5000);