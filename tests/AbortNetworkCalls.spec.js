const {test, expect} = require('@playwright/test'); //important
const { request } = require('node:http');

// always add the async to the begining of the function
// browser is a global fixture that comes automatic from playwright
test('Browser context playwright test', async ({browser}) => { //initializing the automation
// add await to every step
const context = await browser.newContext();
const page = await context.newPage();

await page.route('**/*.css', 
    route => route.abort()); // This will block the page from loading css in the browser

await page.route('**/*.{jpg,png,jpeg}', 
    route => route.abort()); // This will block the page from loading images in the browser

await page.on('request', request => console.log(request.url())); // Listen to page and print url
await page.on('response', response => console.log(response.url(), console.log(response.status()))); // printing the response and 
// status codes after the page listens

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title());

// css, and xpath to select page elements

const username = page.locator('#username')
const password = page.locator("input[id='password']")
const checkRadio = page.locator("input[value='admin']")
const dropDown = page.locator('select.form-control')
const signInbtn = page.locator("#signInBtn")
const cardTitles = page.locator('.card-body a')
const terms = page.locator('#terms')


await username.fill('rahulshettyacademy');
await password.fill('Learning');
await dropDown.selectOption('teach')
await terms.check()
await expect(terms.isChecked).toBeTruthy();// expect it be checked
await page.locator("#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());//print err message
await expect (page.locator("[style*='block']")).toContainText('Incorrect');

await password.fill('Learning@830$3mK2')
await checkRadio.click()
await expect (checkRadio).toBeChecked();
await signInbtn.click()

await cardTitles
console.log(await cardTitles.nth(0).textContent())
console.log(await cardTitles.first(1).textContent()); //Same as above
const allTitles = await cardTitles.allTextContents();
await expect(allTitles).toHaveLength(4);
await expect(allTitles).toContain('iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry');
console.log(allTitles);

const documentLink = page.locator("[href*='documents-request']");
//await expect(documentLink).toHaveAttribute("class","blinkingText"); //blinking text

})

test('Child Windows Handling', async ({browser}) => { //initializing the automation
// playwright sees the page and automatically does the browser setup for you
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

const userName = page.locator("input#username");
const documentLink = page.locator("[href*='documents-request']");

const [newPage, newPage2 ] = await Promise.all( // // An array of promises to make sure these two actions are fulfilled before moving to the next step. 
    //if either one fails the promise fails
[
    context.waitForEvent('page'), ////listen for any new page pending, rejected, fulfilled
    documentLink.click(),
]
) // New Page is opened
// newPage2 is meant for another chikd window should it open, you can add on and on....

const sentence = await newPage.locator(".im-para.red");
console.log(sentence);
await expect(sentence).toContainText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');
const text = await sentence.textContent()

const arrayText = text.split("@")
const domain = arrayText[1].split(" ")[0]
console.log(domain)

await userName.fill(domain);
console.log(await userName.inputValue());//After altering the filled text, to obtain it again we use inputValue()
await page.pause();
});