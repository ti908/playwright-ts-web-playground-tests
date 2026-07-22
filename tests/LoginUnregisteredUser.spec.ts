import { expect } from '@playwright/test';
import { POManager } from '../pageobjects_ts/POManager';
import { customTest as test } from '../utils_ts/test-base';

test('@Web should not allow an unregistered user to login', async({page, testDataForOrder}) =>{
    const unregisteredEmail = `unregistered.user.${Date.now()}@example.com`;
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.InvalidLogin(unregisteredEmail, testDataForOrder.password);

    await expect(loginPage.loginErrorMessage).toContainText('Incorrect');
    await expect(page).toHaveURL(/auth\/login/);
});
