const {test, expect} = require ('@playwright/test');

test('Tests the getByRole features', async({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/angularpractice/")

        await page.locator("div[class='form-group'] input[name='name']").fill("James Harden")
        await page.locator("input[name='email']").fill("jamesharden@gmail.com")


        //await page.getByRole("textbox",{name: "Name"}).fill("James")
        //For placeholder attributes
        await page.getByPlaceholder("Password").fill("AlwaysGod")

        // getByLabel doesnt work efficiently with typings but works well with clicks and selections and check
        await page.getByLabel("Gender").selectOption('Female')
        await page.getByLabel("Check me out if you Love IceCreams!").click() //intelligently clicks a box in the label's zone
        await page.getByLabel("Employed").click()

        await page.getByRole("button",{name: "Submit"}).click()
        await page.getByText(" The Form has been submitted successfully!.").isVisible();
        const autoname = await page.locator("h4 input[name='name']").textContent()
        //await expect(autoname.includes("James Harden"))

        await page.getByRole("link",{name: "Shop"}).click()

        await page.locator("app-card").filter({hasText: "iphone X"}).getByRole("button", {hasText: "Add "}).click();
        await page.locator("app-card").filter({hasText: "Samsung Note 8"}).getByRole("button").click();
        await page.locator(".btn-primary").click();


});