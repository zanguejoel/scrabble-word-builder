import { test, expect } from '@playwright/test';

test.describe('Help Tooltip', () => {
  test('should display help button', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button[aria-label="How to use this app"]')).toBeVisible();
  });

  test('should open tooltip on click', async ({ page }) => {
    await page.goto('/');

    // Click help button
    await page.click('button[aria-label="How to use this app"]');

    // Wait for tooltip to appear
    await expect(page.locator('text=How to Use')).toBeVisible();
  });

  test('should display all instruction steps', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load by checking for input field
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    const helpButton = page.locator('button[aria-label="How to use this app"]');
    await expect(helpButton).toBeVisible();

    await helpButton.click({ force: true });

    // Wait for tooltip and animation to complete
    await expect(page.locator('text=How to Use')).toBeVisible({ timeout: 3000 });

    await expect(page.locator('text=1. Enter Your Rack')).toBeVisible();
    await expect(page.locator('text=2. Add Board Letters (Optional)')).toBeVisible();
    await expect(page.locator('text=3. Find Best Word')).toBeVisible();
  });

  test('should display instruction details', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    const helpButton = page.locator('button[aria-label="How to use this app"]');
    await helpButton.click({ force: true });

    // Wait for tooltip to be visible
    await expect(page.locator('text=How to Use')).toBeVisible({ timeout: 3000 });

    await expect(page.locator('text=Click the keyboard letters or type 1-7 letters')).toBeVisible();
    await expect(page.locator('text=Enter any letters already on the board')).toBeVisible();
    await expect(page.locator('text=highest-scoring word')).toBeVisible();
  });

  test('should display dictionary info', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    const helpButton = page.locator('button[aria-label="How to use this app"]');
    await helpButton.click({ force: true });

    // Wait for tooltip to be visible
    await expect(page.locator('text=How to Use')).toBeVisible({ timeout: 3000 });

    await expect(page.locator('text=Uses official Scrabble tile counts')).toBeVisible();
    await expect(page.locator('text=178,000+ word dictionary')).toBeVisible();
  });

  test('should close tooltip on second click', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load by checking for input field
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    const helpButton = page.locator('button[aria-label="How to use this app"]');
    const tooltip = page.locator('text=How to Use');

    // Ensure button is ready
    await expect(helpButton).toBeVisible();

    // Open tooltip with force to ensure click registers
    await helpButton.click({ force: true });
    await expect(tooltip).toBeVisible({ timeout: 3000 });

    // Wait for animation to complete and ensure tooltip is stable
    await page.waitForTimeout(600);

    // Move mouse away from button and tooltip area to avoid hover interference
    await page.mouse.move(10, 10);
    await page.waitForTimeout(200);

    // Click to close
    await helpButton.click({ force: true });

    // Wait for exit animation
    await page.waitForTimeout(600);

    await expect(tooltip).not.toBeVisible();
  });

  test('should close tooltip when clicking outside', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    // Open tooltip
    const helpButton = page.locator('button[aria-label="How to use this app"]');
    await helpButton.click({ force: true });
    await expect(page.locator('text=How to Use')).toBeVisible({ timeout: 3000 });

    // Click outside (on the title)
    await page.click('h1');
    await page.waitForTimeout(300);

    await expect(page.locator('text=How to Use')).not.toBeVisible();
  });

  test('should show tooltip on hover', async ({ page }) => {
    await page.goto('/');

    // Wait for app to fully load
    await page.waitForSelector('input[placeholder*="AIDOORW"]', { timeout: 15000 });
    await page.waitForTimeout(200);

    // Hover over help button
    await page.hover('button[aria-label="How to use this app"]');
    await page.waitForTimeout(300);

    await expect(page.locator('text=How to Use')).toBeVisible();
  });
});
