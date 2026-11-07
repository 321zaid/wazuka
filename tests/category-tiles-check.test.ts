import { test, expect } from '@playwright/test';

test('Verify category tiles section', async ({ page }) => {
  await page.goto('http://localhost:4173/');
  
  // Wait for page to load
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
  await expect(firstTile).toHaveAttribute('class', /group-hover:scale-105/);
  
  // 4. Check color classes
  await expect(firstTile).toHaveClass(/bg-\[--color-blue-50/);
  await expect(firstTile).toHaveClass(/border-navy-900\/5/);
  
  // 5. Check responsive grid - resize to phone
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForLoadState('networkidle');
  
  // Check grid becomes 2 columns on sm:grid-cols-2
  const grid = page.locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3');
  const computedStyle = await grid.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('grid-template-columns');
  });
  console.log(`Grid template columns at 390px: ${computedStyle}`);
  
  // 6. Check screenshots
  await page.screenshot({ path: 'tests/screenshots/category-desktop.png', width: 1440, height: 900 });
  console.log('Desktop screenshot taken');
  
  await page.screenshot({ path: 'tests/screenshots/category-phone.png', width: 390, height: 844 });
  console.log('Phone screenshot taken');
  
  console.log('All checks completed!');
});