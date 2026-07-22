import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage
{
    page: Page
    products: Locator
    titles: Locator
    cartbtn: Locator

    constructor(page: Page){
        this.page = page
        this.products = page.locator('.card-body');
        this.titles = page.locator(".card-body b");
        this.cartbtn = page.locator("[routerlink*='cart']");
    }

    async getProduct(productName: string)
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

    }

    async clickCart()
    {
        await this.cartbtn.click()
    }
}

module.exports = {DashboardPage};