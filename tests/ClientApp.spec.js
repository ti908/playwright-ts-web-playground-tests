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
    const primaryemail = "martin.ampah@ashesi.edu.gh";
    const realpassword = "French123";

    await page.getByPlaceholder("email@example.com").fill(primaryemail);
    await page.getByPlaceholder("enter your passsword").fill(realpassword)
    //await loginbtn.click();

    await page.getByRole("button", {name: "Login"}).click()

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

    //await page.locator("[routerlink*='cart']").click()
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    await page.waitForLoadState('networkidle');
})

