import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

// Functional test (runs everywhere)
test("@Web Screenshot and Visual Comparisons", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator('#displayed-text').screenshot({ path: 'textboxscreenshot.png' });

    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: 'hiddenscreenshot.png' });

    await expect(page.locator("#displayed-text")).toBeHidden();
});


// Visual test (Chromium ONLY — CORRECT FIX)
test.describe('Visual Tests (Chromium only)', () => {

    // This runs BEFORE tests are executed → prevents Firefox/WebKit from running at all
    test.skip(({ browserName }) => browserName !== 'chromium',
        'Skipping visual tests on non-Chromium browsers');

    test('Visual Test', async ({ page }) => {

        await page.goto("http://rahulshettyacademy.com/AutomationPractice/");
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('landing.png', {
            maxDiffPixelRatio: 0.05,
        });

    });

});