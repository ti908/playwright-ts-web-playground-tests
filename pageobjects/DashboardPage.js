class DashboardPage{

    constructor(page){
        this.page = page
        this.products = page.locator('.card-body');
        this.titles = page.locator(".card-body b");
        this.cartbtn = page.locator("[routerlink*='cart']");
    }

    async getProduct(productName)
    {
    const allTitles = await this.titles.allTextContents();
    console.log(allTitles);

    const count = await this.products.count();
    for(let i=0; i<count; i++){
        if(await this.products.nth(i).locator('b').textContent() == productName){
            await this.products.nth(i).locator("text=Add To Cart").click() //Add to cart
            break;
        }
    }
    await this.page.waitForLoadState('networkidle');

    }

    async clickCart()
    {
        await this.cartbtn.click()
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {DashboardPage};