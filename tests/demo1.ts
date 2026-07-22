import { expect, type Locator, type Page } from '@playwright/test';
let message1: string = "Hello";
//message1 = 2; Not possible with .ts since we initially
// initially said its a string
message1 = "Bye"
console.log(message1)
let age1 : number = 20;
console.log(age1)

let Active: boolean = true;
console.log(Active)

let num : number[] = [1,2,3,];
console.log(num)

let data: any = "Hello"// To change the characteristics
// to .js
data = 34;

function add (a: number,b: number):number
{

    return a + b;
}
console.log(add(4,5));

let user: {name: string, age: number} = {name: "Bob", age: 24}

//classes
class CartPage
{
       page : Page
       ordertable : Locator
       checkOutbtn : Locator

    constructor(page: any)
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
    }
}
