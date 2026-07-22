//const {test, expect} = require ('@playwright/test');
import { test, expect, type Locator, type Page } from '@playwright/test';

// const {LoginPage} = require('../pageobjects/LoginPage');
// const { DashboardPage } = require('../pageobjects/DashboardPage');
// const {CartPage} = require('../pageobjects/CartPage');
// const {CheckOutPage} = require('../pageobjects/CheckOutPage');
//const {POManager} = require('../pageobjects/POManager');
import { POManager } from '../pageobjects_ts/POManager';
const  dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppData.json')));

import { customTest } from '../utils_ts/test-base';

//const {customtest} = require('../utils/test-base');


// for (const data of dataset){
//     // Put the entire test here to deal with an array of datasets to test for. Like the Data in ClientAppData2
//     //Check lecture 85
// }

test('@Web Second UI test', async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    // const username = "martin.ampah@ashesi.edu.gh";
    // const password = "French123";
    // const productName = "ZARA COAT 3";
    const cardfill = "4542 9931 9292 2293";
    const cvv = "321"
   

    // const loginPage = new LoginPage(page);
    // const dashboardPage = new DashboardPage(page);
    // const cartPage = new CartPage(page);
    // const checkOutPage = new CheckOutPage(page);

    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage()
    loginPage.goTo();
    await loginPage.ValidLogin(dataset.username,dataset.password);
    await page.waitForLoadState('networkidle');
    console.log(await page.title())

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.getProduct(dataset.productName);
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").filter({hasText: 'IPHONE 13 PRO'}).getByRole("button",{name:" Add To Cart"}).click();
    await dashboardPage.clickCart();
    await page.waitForLoadState('networkidle');

    const cartPage = poManager.getCartPage();
    await cartPage.getCheckOutBtn(dataset.productName)
    await page.waitForLoadState('networkidle');
    await expect (page.locator(".user__name [type='text']").first()).toHaveText(dataset.username);

    const checkOutPage = poManager.getCheckOutPage();
    await checkOutPage.fillUserDetails(cardfill,cvv)

    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").allTextContents()
    console.log(orderId)
    page.pause()
    const orderId1 = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
    //await expect(orderId.nth(0)).toHaveText(" | 69824971c941646b7ad1bd63 | ")
    console.log(orderId1)

    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForLoadState()
    await page.locator('tbody').waitFor()

    const rows = page.locator("tbody tr");
    

    for(let i=0; i < await rows.count(); i++){
        
        let roworderId = await rows.nth(i).locator('th').textContent();
        if(orderId1.includes(roworderId)){
            await rows.nth(i).locator("button").first().click()
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect (orderId1.includes(orderIdDetails)).toBeTruthy();
    
});

customTest('Second UI test', async({browser,testDataForOrder}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    // const username = "martin.ampah@ashesi.edu.gh";
    // const password = "French123";
    // const productName = "ZARA COAT 3";
    const cardfill = "4542 9931 9292 2293";
    const cvv = "321"
   

    // const loginPage = new LoginPage(page);
    // const dashboardPage = new DashboardPage(page);
    // const cartPage = new CartPage(page);
    // const checkOutPage = new CheckOutPage(page);

    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage()
    loginPage.goTo();
    await loginPage.ValidLogin(testDataForOrder.username,testDataForOrder.password);
    await page.waitForLoadState('networkidle');
    console.log(await page.title())

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.getProduct(testDataForOrder.productName);
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").filter({hasText: 'IPHONE 13 PRO'}).getByRole("button",{name:" Add To Cart"}).click();
    await dashboardPage.clickCart();
    await page.waitForLoadState('networkidle');

    const cartPage = poManager.getCartPage();
    await cartPage.getCheckOutBtn(testDataForOrder.productName)
})

