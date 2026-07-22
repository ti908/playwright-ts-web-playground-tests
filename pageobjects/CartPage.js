const {expect} = require ('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.ordertable = page.locator("div li");
        this.checkOutbtn = page.locator("text=Checkout");
    }

    async getCheckOutBtn()
    {
        await this.ordertable.first().waitFor();
        await expect(this.page.getByText("ZARA COAT 3")).toBeVisible();
        await this.checkOutbtn.click()
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {CartPage}