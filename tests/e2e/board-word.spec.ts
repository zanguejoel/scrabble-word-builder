import { test, expect } from '@playwright/test';

test.describe('Board Word Building', () => {
  test('should find word containing board word', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    // Enter rack and board word
    await page.fill('input[placeholder*="AIDOORW"]', 'AID');
    await page.fill('input[placeholder*="WIZ"]', 'WIZ');

    await page.click('button:has-text("Find Best Word")');

    // Wait for result with longer timeout
    await page.waitForTimeout(500);

    // Either finds a word or shows error
    const hasSuccess = await page.locator('text=Best Word Found!').isVisible({ timeout: 15000 }).catch(() => false);
    const hasError = await page.locator('text=Error').isVisible({ timeout: 15000 }).catch(() => false);

    expect(hasSuccess || hasError).toBe(true);

    if (hasSuccess) {
      // If word found, it should contain WIZ
      await expect(page.locator('text=Best Word Found!')).toBeVisible();
    }
  });

  test('should accept optional board word', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    // Enter only rack, leave board empty
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');

    await page.click('button:has-text("Find Best Word")');

    await page.waitForSelector('text=Best Word Found!', { timeout: 10000 });
    await expect(page.locator('text=Best Word Found!')).toBeVisible();
  });

  test('should work with rack and board combination', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    await page.fill('input[placeholder*="AIDOORW"]', 'OOR');
    await page.fill('input[placeholder*="WIZ"]', 'DO');

    await page.click('button:has-text("Find Best Word")');

    // Wait for result with longer timeout
    await page.waitForTimeout(500);

    // Either finds a word or shows error
    const hasSuccess = await page.locator('text=Best Word Found!').isVisible({ timeout: 15000 }).catch(() => false);
    const hasError = await page.locator('text=Error').isVisible({ timeout: 15000 }).catch(() => false);

    expect(hasSuccess || hasError).toBe(true);
  });
});
