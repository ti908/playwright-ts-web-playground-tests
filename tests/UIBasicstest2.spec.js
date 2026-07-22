const {test, expect} = require ('@playwright/test');

test('Second UI test', async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title())

    const username = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginbtn = page.locator("input[value='Login']")
    const product = page.locator('.card-body')
    const productName = "ADIDAS ORIGINAL";

    await username.fill("martin.ampah@ashesi.edu.gh");
    await password.fill("French123");
    await loginbtn.click();

    await page.waitForLoadState('networkidle'); // To ensure all elements of the page have fully loaded
    await page.locator(".card-body b").first().waitFor()// wait for items on the screen to load
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

    await page.locator("[routerlink*='cart']").click()

    await page.waitForLoadState('networkidle');
    await page.locator("div li").first().waitFor();

    const bool1 = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    await expect(bool1).toBeFalsy();
    const bool2 = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(bool2).toBeFalsy();

    //await page.locator("text=Checkout").click() // Finding elements by text 
    await page.getByRole("button", {name: "Checkout"}).click()

    const creditCard = page.locator("input[value='4542 9931 9292 2293']")
    await creditCard.fill("4542 9931 9292 2293")
    await page.locator("input[type='text']").nth(1).fill('321')

    await page.getByRole('combobox').nth(0).selectOption("09")
    await page.getByRole('combobox').nth(1).selectOption("30")
    const email = "martin.ampah@ashesi.edu.gh"
    await expect (page.locator(".user__name [type='text']").first()).toHaveText(email)

    await page.locator("[placeholder='Select Country']").pressSequentially('Gha'); //To type sequentially
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    // await page.getByRole("button",{name:"Ghan"}).nth(1).click(); // Simplifies the above and below for loop lines of code

     for (let i=0; i<optionsCount; i++){
         const text = await dropdown.locator("button").nth(i).textContent();
         if (text === " Ghana"){
             await dropdown.locator("button").nth(i).click();
             break;
        }
     }

    await page.locator(".action__submit").click()
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
        const roworderId = await rows.nth(i).locator('th').textContent();
        if(orderId1.includes(roworderId)){
            await rows.nth(i).locator("button").first().click()
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect (orderId1.includes(orderIdDetails)).toBeTruthy();



    
})

