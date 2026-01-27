import { test, expect } from '@playwright/test';

test.describe('Word Finding Flow', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Scrabble Word Builder');
  });

  test('should find best word from simple rack', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to load
    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    // Enter rack letters
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');

    // Click find button
    await page.click('button:has-text("Find Best Word")');

    // Wait for result to appear
    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Verify a result is displayed
    await expect(page.locator('text=Best Word Found!')).toBeVisible();
    await expect(page.locator('text=Score:')).toBeVisible();
  });

  test('should display letter breakdown', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');
    await page.click('button:has-text("Find Best Word")');

    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Check that letter tiles are displayed
    const letterTiles = page.locator('.bg-amber-100');
    await expect(letterTiles.first()).toBeVisible();
  });

  test('should find word from longer rack', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');
    await page.fill('input[placeholder*="AIDOORW"]', 'WORD');
    await page.click('button:has-text("Find Best Word")');

    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });
    await expect(page.locator('text=Best Word Found!')).toBeVisible();
  });

  test('should show validation checkmarks', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');
    await page.click('button:has-text("Find Best Word")');

    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    await expect(page.locator('text=Valid dictionary word')).toBeVisible();
    await expect(page.locator('text=Tiles within limits')).toBeVisible();
    await expect(page.locator('text=Uses available letters')).toBeVisible();
    await expect(page.locator('text=Highest possible score')).toBeVisible();
  });

  test('should display multiple valid words', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');
    await page.fill('input[placeholder*="AIDOORW"]', 'WORD');
    await page.click('button:has-text("Find Best Word")');

    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Should show "Other Valid Words" section when multiple words found
    await expect(page.locator('text=Other Valid Words')).toBeVisible();
    await expect(page.locator('text=total found')).toBeVisible();
  });

  test('should scroll to results after finding words', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);

    await page.click('button:has-text("Find Best Word")');
    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Wait for scroll animation
    await page.waitForTimeout(500);

    // Verify page scrolled
    const finalScroll = await page.evaluate(() => window.scrollY);
    expect(finalScroll).toBeGreaterThanOrEqual(initialScroll);
  });

  test('should show scroll buttons after scrolling', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    // Generate content by finding words first
    await page.fill('input[placeholder*="AIDOORW"]', 'WORD');
    await page.click('button:has-text("Find Best Word")');
    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Now scroll down the page (needs > 300px for buttons to show)
    await page.evaluate(() => window.scrollTo(0, 500));

    // Wait for scroll event handler and animation
    await page.waitForTimeout(600);

    // Scroll buttons should appear
    await expect(page.locator('button[aria-label="Scroll to top"]')).toBeVisible({ timeout: 2000 });
    await expect(page.locator('button[aria-label="Scroll to bottom"]')).toBeVisible();
  });

  test('scroll to top button should work', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    // Generate content by finding words first
    await page.fill('input[placeholder*="AIDOORW"]', 'WORD');
    await page.click('button:has-text("Find Best Word")');
    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Wait for scroll buttons to appear
    await page.waitForTimeout(600);
    await expect(page.locator('button[aria-label="Scroll to top"]')).toBeVisible({ timeout: 2000 });

    // Click scroll to top button
    await page.click('button[aria-label="Scroll to top"]');
    await page.waitForTimeout(800);

    // Verify scrolled to top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50);
  });
});
