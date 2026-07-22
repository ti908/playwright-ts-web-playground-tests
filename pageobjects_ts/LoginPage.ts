import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    
    page : Page
    signInbutton: Locator
    username: Locator
    password: Locator
    loginErrorMessage: Locator
    
    constructor(page: Page){
        this.page = page
        this.signInbutton = page.locator("input[value='Login']");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginErrorMessage = page.getByRole('alert');

    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async ValidLogin(username: string,password: string)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
    }

    async InvalidLogin(username: string,password: string)
    {
        await this.ValidLogin(username, password);
    }
}

module.exports = {LoginPage}
