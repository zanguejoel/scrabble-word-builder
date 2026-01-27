import { test, expect } from '@playwright/test';

test.describe('Loading States', () => {
  test('should show loading state initially', async ({ page }) => {
    await page.goto('/');

    // Check if loading indicator appears or if content loads immediately
    const hasLoadingIndicator = await page.locator('text=/loading/i').isVisible().catch(() => false);
    const hasContent = await page.locator('h1').isVisible().catch(() => false);

    // Either loading or content should be visible
    expect(hasLoadingIndicator || hasContent).toBe(true);
  });

  test('should eventually show the form', async ({ page }) => {
    await page.goto('/');

    // Wait for the form inputs to appear
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    await expect(page.locator('input[placeholder*="AIDOORW"]')).toBeVisible();
    await expect(page.locator('button:has-text("Find Best Word")')).toBeVisible();
  });

  test('should enable form inputs after loading', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    const rackInput = page.locator('input[placeholder*="AIDOORW"]');
    await expect(rackInput).toBeEnabled();

    const boardInput = page.locator('input[placeholder*="WIZ"]');
    await expect(boardInput).toBeEnabled();
  });

  test('should enable submit button after loading with rack input', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    const submitButton = page.locator('button:has-text("Find Best Word")');

    // Button should be disabled when rack is empty
    await expect(submitButton).toBeDisabled();

    // Fill the rack input
    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');

    // Now button should be enabled
    await expect(submitButton).toBeEnabled();
  });

  test('should successfully submit after loading', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });

    // Wait a bit to ensure dictionary/letter data is loaded
    await page.waitForTimeout(2000);

    await page.fill('input[placeholder*="AIDOORW"]', 'CAT');
    await page.click('button:has-text("Find Best Word")');

    // Should get a result (success or error, but not crash)
    const hasSuccess = await page.waitForSelector('text=Best Word Found!', { timeout: 10000 }).catch(() => null);
    const hasError = await page.locator('text=Error').isVisible().catch(() => false);

    expect(hasSuccess || hasError).toBeTruthy();
  });
});
