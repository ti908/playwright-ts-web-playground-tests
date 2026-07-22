const {test, expect, request} = require ("@playwright/test") //Add request to work with APIs

const loginPayload = {userEmail: "martin.ampah@ashesi.edu.gh", userPassword: "French123"} //Instantiating .js LoginPayload


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
        
;
})

// test.beforeEach("Execute this before any tests", async ()=>{
        
// })

test("Security Test request intercept", async({browser})=>{
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

    //Reach orders page
    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForLoadState()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    // Telling playwright to monitor the route pattern above. If recognized continue below:

    route => route.continue(
        {url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6981db4ac941646b7ad07456"} // A different orderId
        //Than what the user ordered for. To check if the product shows up. The server should reject this
    )
    );
    //Before this code reaches the server itself, were intercepting the response. Look at Route documentation on Route
    await page.pause();

    await page.locator("td .btn-primary").first().click();
    await page.pause();

    const blinkingText = await page.locator(".blink_me"); // Assert that the error is being displayed
    await expect(blinkingText).toBeVisible();
    await expect(blinkingText).toHaveText("You are not authorize to view this order");
})


