const base = require('@playwright/test');


exports.customtest = base.test.extend(
    {
        testDataForOrder : {
                username : "martin.ampah@ashesi.edu.gh",
                password : "French123",
                productName : "ZARA COAT 3"
        }
    }
);
exports.expect = base.expect;