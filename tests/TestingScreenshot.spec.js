const {test, expect} = require ("@playwright/test");

test.describe.configure({mode: 'parallel'}); // To run the tests in this test file in parallel
test("@Web Screenshot and Visual Comparisons", async({browser}) =>{
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto("http://rahulshettyacademy.com/AutomationPractice/")
        // await page.goto("http://google.com")
        // await page.goBack(); // To return to the previous page
        // await page.goForward(); // To reverse the above

        // Hidden Text
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator('#displayed-text').screenshot({path: 'textboxscreenshot.png'})
        await page.locator("#hide-textbox").click()
        await page.screenshot({path: 'hiddenscreenshot.png'})
        await expect(page.locator("#displayed-text")).toBeHidden();
})

test('Visual Test', async({browser}) =>{
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("http://rahulshettyacademy.com/AutomationPractice/")
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot('landing.png', {
        maxDiffPixelRatio: 0.05, // allow up to 5% difference
});
})