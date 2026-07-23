import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

// Functional test (runs everywhere)
test("@Web Screenshot and Visual Comparisons", async ({ page }) => {

    await page.goto("http://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator('#displayed-text').screenshot({ path: 'textboxscreenshot.png' });

    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: 'hiddenscreenshot.png' });

    await expect(page.locator("#displayed-text")).toBeHidden();
});


// Visual test (tagged)
test('@visual Visual Test', async ({ page }) => {

    await page.goto("http://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('landing.png', {
        maxDiffPixelRatio: 0.05,
    });

});