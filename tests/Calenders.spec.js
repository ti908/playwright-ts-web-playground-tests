const {test, expect} = require ('@playwright/test')

test("Handling Calenders", async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const day = "24"
    const year = "2030"
    const month = "9"
    const List = [month,day,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    //await page.getByText(year).click()
    await page.getByRole("button",{name: "2030", exact: true}).click();
    await page.getByRole("button",{name: "September"}).click();
    //await page.locator(".react-calendar__tile react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click()

    const input = await page.locator(".react-date-picker__inputGroup input")

    for(let i=0; i<List.length; i++){
        console.log(i)
        const value = await input.nth(i).inputValue();
        console.log(value)
        //expect(value).toEqual(List[i])

    }






})