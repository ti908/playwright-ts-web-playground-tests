const {test, expect, request} = require ("@playwright/test") //Add request to work with APIs
const {APIUtils} = require ('../utils/APIutils')

const loginPayload = {userEmail: "martin.ampah@ashesi.edu.gh", userPassword: "French123"} //Instantiating .js LoginPayload
const orderPayload = {orders: [{country: "Afghanistan", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
 //Instantiating .js LoginPayload

let token; //Making the token globally accessible
let orderId; // "let" is used when you do not intend to initialize a variable at first but later assign.

test.beforeAll("Execute this once before any tests", async ()=>{
        const APIcontext = await request.newContext();
        const apiUtils = new APIUtils(APIcontext,loginPayload);
})

// test.beforeEach("Execute this before any tests", async ()=>{
        
// })

test("Placing the order directly", async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();

        const apiUtils = new APIUtils(APIcontext, loginPayload, orderPayload);
        const orderId = createOrder(orderPayload);

        page.addInitScript(value => { // allows us to add javascript code to run within scenario
                window.localStorage.setItem("token",value);// setting the token in the local storage value to bypass login
                }, token); // token is taken as the value within the annonymous function above

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    console.log(await page.title())

    //const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent()
    //console.log(orderId)

    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForLoadState()
    await page.locator('tbody').waitFor()

    const rows = page.locator("tbody tr");

    for(let i=0; i < await rows.count(); i++){
        const roworderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(roworderId)){
            await rows.nth(i).locator("button").first().click()
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    page.pause();
    expect (orderId.includes(orderIdDetails)).toBeTruthy();
        })
