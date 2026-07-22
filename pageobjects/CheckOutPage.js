const {expect} = require('@playwright/test')

class CheckOutPage
{
    constructor(page)
    {
        this.page = page
        this.creditCard = page.locator("input[value='4542 9931 9292 2293']")
        this.cvvCard = page.locator("input[type='text']")
        this.countryPlaceHolder = page.locator("[placeholder='Select Country']")
        this.placeOrder = page.locator(".action__submit");

    }

    async fillUserDetails(cardfill,cvv,username)
    {
        await this.creditCard.fill(cardfill)
        await this.cvvCard.nth(1).fill(cvv)
        await this.page.getByRole('combobox').nth(0).selectOption("09")
        await this.page.getByRole('combobox').nth(1).selectOption("30")
        await this.countryPlaceHolder.pressSequentially('Gha'); //To type sequentially
        await this.page.getByRole("button",{name:"Ghan"}).nth(1).click();

        await expect (this.page.locator(".user__name [type='text']").first()).toHaveText(username);
        await this.placeOrder.click();
    }

}

module.exports = {CheckOutPage}