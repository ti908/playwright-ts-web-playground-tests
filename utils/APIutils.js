class APIUtils // Classes hold methods. File name should match class name.
{
    constructor(APIcontext, loginPayload, orderPayload){
        this.APIcontext = APIcontext;
        this.loginPayload = loginPayload;
        this.orderPayload = orderPayload;

    }
    async getToken(){
        const loginresponse = await this.APIcontext.post(" https://www.rahulshettyacademy.com/api/ecom/auth/login",
                        {data: loginPayload
                        });// Making a new post call to the url
        
                // ok returns status code 200,201 if successfull
                const loginresponseJson = JSON.parse(await loginresponse.text());
                console.log(loginresponseJson)
                token = loginresponseJson.token;
                console.log(token);
                return token;
    }

    async createOrder(orderPayload){
        const orderResponse = await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                    {data: orderPayload,
                    headers: {
                        'Authorization': this.getToken(),
                        "Content-Type" : "application/json",
                    },
                });
                console.log(orderResponse)
                expect(orderResponse.ok()).toBeTruthy();
                const JSONorderResponse = JSON.parse(await orderResponse.text());
                console.log(JSONorderResponse);
                orderId = JSONorderResponse.orders[0];
                console.log(orderId)
                return orderId

    }
}

export default APIUtils