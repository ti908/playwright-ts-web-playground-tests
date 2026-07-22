import { expect, type Locator, type Page } from '@playwright/test';

//const {expect} = require ('@playwright/test');

export class CartPage
{
    page: Page;
    ordertable: Locator;
    checkOutbtn: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.ordertable = page.locator("div li");
        this.checkOutbtn = page.locator("text=Checkout");
    }

    async getCheckOutBtn(productName: string)
    {
        await this.ordertable.first().waitFor();
        await expect(this.page.getByText(productName)).toBeVisible();
        await this.checkOutbtn.click()
    }
}

module.exports = {CartPage}