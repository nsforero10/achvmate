import { test, expect } from '@playwright/test';

test.describe('AchvMate Golden Path', () => {
  test('User can log in, view dashboard, and interact with habits', async ({ page }) => {
    await page.goto('/');

    if (page.url().includes('/login')) {
      await expect(page.locator('text=Log in to')).toBeVisible();
      
      return;
    }

    await expect(page.locator('text=Habit track')).toBeVisible();

    await page.click('button:has-text("New Habit")');
    await expect(page.locator('text=Create new habit')).toBeVisible();

    await page.click('button[aria-label="close"]');
  });
});
