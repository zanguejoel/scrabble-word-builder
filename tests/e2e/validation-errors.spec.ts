import { test, expect } from '@playwright/test';

test.describe('Validation Errors', () => {
  test('should show error for empty rack', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    // Leave rack empty and try to submit
    await page.click('button:has-text("Find Best Word")');

    // Should show validation error
    await expect(page.locator('text=/.*must contain.*letters/i')).toBeVisible();
  });

  test('should show error for rack with too many letters', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    // Try to enter 8 letters (maxLength should prevent this)
    await page.fill('input[placeholder*="AIDOORW"]', 'AIDOORWZ');

    // Input should be limited to 7 characters
    const inputValue = await page.inputValue('input[placeholder*="AIDOORW"]');
    expect(inputValue.length).toBeLessThanOrEqual(7);
  });

  test('should show character count', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');

    await expect(page.locator('text=3 / 7')).toBeVisible();
  });

  test('should convert input to uppercase', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    await page.fill('input[placeholder*="AIDOORW"]', 'cat');

    const inputValue = await page.inputValue('input[placeholder*="AIDOORW"]');
    expect(inputValue).toBe('CAT');
  });

  test('should show error when no valid word found', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]');

    // Use letters that are unlikely to form a valid word in our dictionary
    await page.fill('input[placeholder*="AIDOORW"]', 'XYZ');

    await page.click('button:has-text("Find Best Word")');

    // Should show error message
    await page.waitForSelector('text=Error', { timeout: 10000 });
    await expect(page.locator('text=Error')).toBeVisible();
  });
});
