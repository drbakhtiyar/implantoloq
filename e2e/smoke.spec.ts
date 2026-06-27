import { test, expect } from '@playwright/test';

// Verify home page renders an h1 for each supported locale.
for (const locale of ['az', 'en', 'ru']) {
  test(`home renders for locale ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator('h1').first()).toBeVisible();
  });
}

// Verify the calculator lead-gate form accepts input and progresses to the wizard.
test('calculator gate form submits and opens wizard', async ({ page }) => {
  await page.goto('/az/kalkulyator');

  // The gate form should be visible first.
  await expect(page.locator('#gate-name')).toBeVisible();

  // Fill name and a valid phone number (9+ digits required).
  await page.fill('#gate-name', 'Test User');
  await page.fill('#gate-phone', '501010107');

  // Submit the gate form.
  await page.locator('form').getByRole('button', { name: /Kalkulyatoru/i }).click();

  // After submission the wizard step 1 heading should appear.
  await expect(page.getByRole('heading', { name: /Neçə implant/i })).toBeVisible();
});
