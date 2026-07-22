const {test, expect, request} = require ("@playwright/test") //Add request to work with APIs

const loginPayload = {userEmail: "martin.ampah@ashesi.edu.gh", userPassword: "French123"} //Instantiating .js LoginPayload
const orderPayload = {userEmail: "martin.ampah@ashesi.edu.gh", userPassword: "French123"} //Instantiating .js LoginPayload

const fakePayLoadOrders = {data:[], message:"No Orders"}

let token; //Making the token globally accessible
test.beforeAll("Execute this once before any tests", async ()=>{
        const APIcontext = await request.newContext()
        const loginresponse = await APIcontext.post(" https://www.rahulshettyacademy.com/api/ecom/auth/login",
                {data: loginPayload
                //  headers: {
                //         "Content-Type": "application/json"
                //  }
                });// Making a new post call to the url

        // ok returns status code 200,201 if successfull
        expect(loginresponse.ok()).toBeTruthy();

        const loginresponseJson = JSON.parse(await loginresponse.text());
        console.log(loginresponseJson)
        token = loginresponseJson.token;
        console.log(token);
        console.log(token.split('.').length);
})

// test.beforeEach("Execute this before any tests", async ()=>{
        
// })

test("Placing the order directly", async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();

        page.addInitScript(value => { // allows us to add javascript code to run within scenario
                window.localStorage.setItem("token",value);// setting the token in the local storage value to bypass login
                }, token); // token is taken as the value within the annonymous function above

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginbtn = page.locator("input[value='Login']")
    const product = page.locator('.card-body')
    const productName = "ADIDAS ORIGINAL";
//     await username.fill("martin.ampah@ashesi.edu.gh");
//     await password.fill("French123");
//     await loginbtn.click();

    //await page.waitForLoadState('networkidle'); // To ensure all elements of the page have fully loaded
    //await page.locator(".card-body b").first().waitFor()// wait for items on the screen to load
    console.log(await page.title())

    const titles = page.locator(".card-body b");
    const allTitles = titles.allTextContents();
    console.log(allTitles)

    const count = await product.count();
    for(let i=0; i<count; i++){
        if(await product.nth(i).locator('b').textContent() == productName){
            await product.nth(i).locator("text= Add To Cart").click() //Add to cart
            break;
        }
    }

    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button", {name: " Add To Cart"}).click();
    //The above simplifies the for loop process above. It's not needed anymore with the nested code above
    await page.locator(".card-body").filter({hasText: 'IPHONE 13 PRO'}).getByRole("button",{name:" Add To Cart"}).click();

        //await page.locator("[routerlink*='cart']").click()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6981db4ac941646b7ad07eb0", 
        async (route) => {
// intercepting the response -> API response -> Faking the response (Playwright here) ->  browser -> render data on front end
         const response = await page.request.fetch(route.request()); // Turning page to API mode to fetch response of route API call.
         let body = JSON.stringify(fakePayLoadOrders); // assigning the fake response to the body to be accepted by the browser
         route.fulfill(
            {
                response,
                body,
            }
         )// fullfiling the call on the browser (sending the response to browser)
        }
    )

    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForLoadState()

    await page.pause()
    console.log(await page.locator(".mt-4").textContent());

})


