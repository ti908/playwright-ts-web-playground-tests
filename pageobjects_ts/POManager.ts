//const {LoginPage} = require('./LoginPage')
import { LoginPage } from "./LoginPage";
//const {DashboardPage} = require('./DashboardPage')
import { DashboardPage } from "./DashboardPage";
//const {CartPage} = require('./CartPage')
import { CartPage } from "./CartPage";
//const {CheckOutPage} = require('./CheckOutPage')
import { CheckOutPage } from "./CheckOutPage";

import { expect, type Locator, type Page } from '@playwright/test';
export class POManager
{
    page : Page
    loginPage : LoginPage;
    dashboardPage : DashboardPage
    cartPage : CartPage;
    checkOutPage : CheckOutPage;

    constructor(page: Page)
    {
        this.page = page
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page)
        this.checkOutPage = new CheckOutPage(page)
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckOutPage()
    {
        return this.checkOutPage;
    }

}
module.exports = {POManager}