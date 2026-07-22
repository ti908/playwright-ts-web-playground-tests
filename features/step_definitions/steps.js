const {test, expect} = require ('@playwright/test');
const {Given, When, Then} = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');

const playwright = require ('@playwright/test');



Given('a Login to Ecommerce application with {string} and {string}', async (username, password) =>{

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page); // To get life into pages


    //For the above check the hooks.js file in the support folder under features
    
        const loginPage = this.poManager.getLoginPage();
        loginPage.goTo();
        await loginPage.ValidLogin(username,password);
        await page.waitForLoadState('networkidle');
        console.log(await page.title());
})

When('Add {string} to Cart', async (productName) =>{
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.getProduct(productName);
    
    //await page.locator(".card-body").filter({hasText: 'IPHONE 13 PRO'}).getByRole("button",{name:" Add To Cart"}).click();
    await dashboardPage.clickCart();
    
});

Then ('Verify {string} is displayed in the Cart', async(string) =>{
    const cartPage = this.poManager.getCartPage();
        await cartPage.getCheckOutBtn()
});

When('Enter valid details and Place the Order', async() =>{
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").allTextContents()
    console.log(orderId)
   // page.pause()
    const orderId1 = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
    //await expect(orderId.nth(0)).toHaveText(" | 69824971c941646b7ad1bd63 | ")
    console.log(orderId1)

    await this.page.locator("button[routerlink*='myorders']").click()
    await this.page.waitForLoadState()
    await this.page.locator('tbody').waitFor()

    const rows = page.locator("tbody tr");

    for(let i=0; i < await rows.count(); i++){
        const roworderId = await rows.nth(i).locator('th').textContent();
        if(orderId1.includes(roworderId)){
            await rows.nth(i).locator("button").first().click()
        }
    }
});

Then('Verify order is present in the OrderHistory', async() => {
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").allTextContents()
    console.log(orderId)

})

