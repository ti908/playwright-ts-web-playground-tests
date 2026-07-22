const {LoginPage} = require('./LoginPage')
const {DashboardPage} = require('./DashboardPage')
const {CartPage} = require('./CartPage')
const {CheckOutPage} = require('./CheckOutPage')

class POManager
{
    constructor(page)
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