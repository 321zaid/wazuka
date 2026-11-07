# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\category-tiles-check.test.ts >> Verify category tiles section
- Location: tests\category-tiles-check.test.ts:3:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 .group.block').first()
Expected pattern: /group-hover:scale-105/
Received string:  "group block rounded-2xl bg-white border border-navy-900/5 transition-all duration-300 hover:shadow-lg hover:border-navy-900/10 no-underline cursor-pointer"
Timeout: 5000ms

Call log:
  - Expect "toHaveAttribute" locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 .group.block').first() with timeout 5000ms
  - waiting for locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 .group.block').first()
    14 × locator resolved to <a data-discover="true" href="/category/glassware" class="group block rounded-2xl bg-white border border-navy-900/5 transition-all duration-300 hover:shadow-lg hover:border-navy-900/10 no-underline cursor-pointer">…</a>
       - unexpected value "group block rounded-2xl bg-white border border-navy-900/5 transition-all duration-300 hover:shadow-lg hover:border-navy-900/10 no-underline cursor-pointer"

```

```yaml
- link "Glassware Glassware Drinking glasses, dessert cups, and glass serveware for every table.":
  - /url: /category/glassware
  - img "Glassware"
  - heading "Glassware" [level=3]
  - paragraph: Drinking glasses, dessert cups, and glass serveware for every table.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Verify category tiles section', async ({ page }) => {
  4  |   await page.goto('http://localhost:4173/');
  5  |   
  6  |   // Wait for page to load
  7  |   await page.waitForLoadState('networkidle');
  8  |   
  9  |   // 1. Check category tiles
  10 |   const categoryTiles = page.locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 .group.block');
  11 |   const tileCount = await categoryTiles.count();
  12 |   console.log(`Number of category tiles: ${tileCount}`);
  13 |   expect(tileCount).toBe(6);
  14 |   
  15 |   // 2. Check SVG icons are present
  16 |   const svgs = page.locator('svg[fill="none"]');
  17 |   const svgCount = await svgs.count();
  18 |   console.log(`Number of SVGs: ${svgCount}`);
  19 |   expect(svgCount).toBeGreaterThan(0);
  20 |   
  21 |   // 3. Check hover effects - scale up
  22 |   const firstTile = categoryTiles.first();
> 23 |   await expect(firstTile).toHaveAttribute('class', /group-hover:scale-105/);
     |                           ^ Error: expect(locator).toHaveAttribute(expected) failed
  24 |   
  25 |   // 4. Check color classes
  26 |   await expect(firstTile).toHaveClass(/bg-\[--color-blue-50/);
  27 |   await expect(firstTile).toHaveClass(/border-navy-900\/5/);
  28 |   
  29 |   // 5. Check responsive grid - resize to phone
  30 |   await page.setViewportSize({ width: 390, height: 844 });
  31 |   await page.waitForLoadState('networkidle');
  32 |   
  33 |   // Check grid becomes 2 columns on sm:grid-cols-2
  34 |   const grid = page.locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3');
  35 |   const computedStyle = await grid.evaluate((el) => {
  36 |     return window.getComputedStyle(el).getPropertyValue('grid-template-columns');
  37 |   });
  38 |   console.log(`Grid template columns at 390px: ${computedStyle}`);
  39 |   
  40 |   // 6. Check screenshots
  41 |   await page.screenshot({ path: 'tests/screenshots/category-desktop.png', width: 1440, height: 900 });
  42 |   console.log('Desktop screenshot taken');
  43 |   
  44 |   await page.screenshot({ path: 'tests/screenshots/category-phone.png', width: 390, height: 844 });
  45 |   console.log('Phone screenshot taken');
  46 |   
  47 |   console.log('All checks completed!');
  48 | });
```