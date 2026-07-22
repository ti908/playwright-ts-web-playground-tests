//const base = require('@playwright/test');
import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder  : {
                username : "martin.ampah@ashesi.edu.gh",
                password : "French123",
                productName : "ZARA COAT 3"
        }
    }
);
//exports.expect = base.expect;