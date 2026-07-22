// //const {After, Before} = require('@cucumber/cucumber');
// const playwright = require ('@playwright/test');
// const {POManager} = require('../../pageobjects/POManager');
// const {Before, After} = require('@cucumber/cucumber')

// Before (async()=>{
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page); // To get life into pages
// });

// After(async()=>{
//     console.log("The test is completed");
// });