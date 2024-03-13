import { test, expect } from '@playwright/test';

test('should complete the challenge flow', async ({ page }) => {
  await page.goto('http://localhost:4173'); // replace with your app's url

  // Fill the form
  await page.fill('input[name="name"]', 'Test Name');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="email"]', 'test@example.com');

  // Start the challenge
  await page.click('button#startChallenge');

  // Click on show data
  await page.click('button#showData');

  // Click on hide data
  await page.click('button#hideData');

  // Finish the challenge
  await page.click('button#finishChallenge');

  // Wait for the modal to appear
  await page.waitForSelector('.modal');

  // Click the close button
  await page.click('.bg-blue-600');

  // Check that the modal has been closed
  const modal = await page.$('.modal');
  expect(modal).toBeNull();
});