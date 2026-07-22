import { test, expect, type APIRequestContext, type APIResponse } from '@playwright/test';

const apiBaseUrl = 'https://www.rahulshettyacademy.com/api/ecom';

const validLoginPayload = {
    userEmail: 'martin.ampah@ashesi.edu.gh',
    userPassword: 'French123',
};

const invalidLoginPayload = {
    userEmail: 'unregistered.user@example.com',
    userPassword: 'French123',
};

const orderPayload = {
    orders: [
        {
            country: 'Ghana',
            productOrderedId: '6960eae1c941646b7a8b3ed3',
        },
    ],
};

type LoginResponse = {
    token: string;
    userId: string;
    message: string;
};

async function login(apiContext: APIRequestContext): Promise<LoginResponse> {
    const response = await apiContext.post(`${apiBaseUrl}/auth/login`, {
        data: validLoginPayload,
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
    expect(responseBody.userId).toBeTruthy();

    return responseBody;
}

async function expectErrorResponse(response: APIResponse): Promise<void> {
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBeGreaterThanOrEqual(400);

    const responseBody = await response.json();
    expect(responseBody.message).toBeTruthy();
}

test.describe('@API Ecommerce API scenarios', () => {
    test('should login registered user and return auth token', async({request}) => {
        const responseBody = await login(request);

        expect(responseBody.message).toContain('Login Successfully');
        expect(responseBody.token.split('.')).toHaveLength(3);
    });

    test('should reject login for unregistered user', async({request}) => {
        const response = await request.post(`${apiBaseUrl}/auth/login`, {
            data: invalidLoginPayload,
        });

        await expectErrorResponse(response);

        const responseBody = await response.json();
        expect(responseBody.message).toContain('Incorrect email or password');
    });

    test('should create an order with a valid token', async({request}) => {
        const { token } = await login(request);

        const response = await request.post(`${apiBaseUrl}/order/create-order`, {
            data: orderPayload,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody.message).toContain('Order Placed Successfully');
        expect(responseBody.orders).toHaveLength(1);
        expect(responseBody.orders[0]).toBeTruthy();
    });

    test('should retrieve customer orders with a valid token', async({request}) => {
        const { token, userId } = await login(request);

        const response = await request.get(`${apiBaseUrl}/order/get-orders-for-customer/${userId}`, {
            headers: {
                Authorization: token,
            },
        });

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('data');
        expect(Array.isArray(responseBody.data)).toBeTruthy();
    });

    test('should reject order creation without authorization token', async({request}) => {
        const response = await request.post(`${apiBaseUrl}/order/create-order`, {
            data: orderPayload,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await expectErrorResponse(response);
    });
});
