const {test, expect} = require ("@playwright/test");

test("Handling extra Validations", async({browser}) =>{
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto("http://rahulshettyacademy.com/AutomationPractice/")
        // await page.goto("http://google.com")
        // await page.goBack(); // To return to the previous page
        // await page.goForward(); // To reverse the above

        // Hidden Text
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click()
        await expect(page.locator("#displayed-text")).toBeHidden();

        page.getAttribute

        //Pop-ups
        page.on("dialog",dialog => dialog.accept());//listen for events. Not put in "await" because its just listening until it happens
        await page.locator("#confirmbtn").click();

        //Mouse-Hover
        await page.locator("#mousehover").hover();
        await page.locator(".mouse-hover-content a[href='#top']").click()

        // Handling i-Frames
        // page.waitForLoadState("networkidle")
        // await page.locator('#courses-iframe').waitFor()
        // const framepage = page.frameLocator("#courses-iframe");
        // await framepage.locator("li a[href*='liferime-access']:visible").click();
        // const textCheck = await framepage.locator(".text h2").textContent();
        // console.log(textCheck.split(" ")[1]);

})