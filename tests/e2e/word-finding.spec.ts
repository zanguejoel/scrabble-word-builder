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
});
