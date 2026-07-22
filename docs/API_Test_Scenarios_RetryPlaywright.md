# API BDD Test Scenarios: RetryPlaywright Ecommerce Project

Document version: 2.0  
Date: July 6, 2026  
Project: RetryPlaywright  
Automation file: `tests/APIProjectScenarios.spec.ts`  
API base URL: `https://www.rahulshettyacademy.com/api/ecom`

## Purpose

This document expresses the project API test coverage as BDD scenarios. The scenarios cover ecommerce API authentication, order creation, customer order retrieval, and authorization behavior.

## Feature File

```gherkin
Feature: Ecommerce API validations
  As an ecommerce platform consumer
  I want the API to authenticate users and manage orders correctly
  So that customer order workflows are secure and reliable

  Background:
    Given the ecommerce API base URL is "https://www.rahulshettyacademy.com/api/ecom"

  @API @auth @positive @smoke
  Scenario: Registered user logs in successfully through the API
    Given a registered API user exists with email "martin.ampah@ashesi.edu.gh"
    And the registered API user password is "French123"
    When the client sends a POST request to "/auth/login" with the registered credentials
    Then the API response should be successful
    And the response body should contain an authentication token
    And the response body should contain a user ID
    And the response message should contain "Login Successfully"
    And the token should have three dot-separated segments

  @API @auth @negative
  Scenario: Unregistered user login is rejected through the API
    Given an unregistered API user email is "unregistered.user@example.com"
    And the API login password is "French123"
    When the client sends a POST request to "/auth/login" with the unregistered credentials
    Then the API response should not be successful
    And the response status should be 400 or higher
    And the response body should contain an error message
    And the response message should contain "Incorrect email or password"

  @API @orders @positive
  Scenario: Authenticated user creates an order through the API
    Given the client has logged in through the API with valid credentials
    And the client has a valid authentication token
    And the order payload contains country "Ghana"
    And the order payload contains product ordered ID "6960eae1c941646b7a8b3ed3"
    When the client sends a POST request to "/order/create-order" with the order payload
    Then the API response should be successful
    And the response message should contain "Order Placed Successfully"
    And the response body should contain exactly one order ID
    And the returned order ID should not be empty

  @API @orders @positive
  Scenario: Authenticated user retrieves customer orders through the API
    Given the client has logged in through the API with valid credentials
    And the client has a valid authentication token
    And the client has the authenticated user ID
    When the client sends a GET request to "/order/get-orders-for-customer/{userId}"
    Then the API response should be successful
    And the response body should contain a "data" property
    And the "data" property should be an array

  @API @orders @security @negative
  Scenario: Order creation is rejected when authorization token is missing
    Given the client does not have an authentication token
    And the order payload contains country "Ghana"
    And the order payload contains product ordered ID "6960eae1c941646b7a8b3ed3"
    When the client sends a POST request to "/order/create-order" with the order payload
    Then the API response should not be successful
    And the response status should be 400 or higher
    And the response body should contain an error message
    And no order should be created
```

## Traceability Matrix

| Scenario | Automated Test Name | File |
| --- | --- | --- |
| Registered user logs in successfully through the API | `should login registered user and return auth token` | `tests/APIProjectScenarios.spec.ts` |
| Unregistered user login is rejected through the API | `should reject login for unregistered user` | `tests/APIProjectScenarios.spec.ts` |
| Authenticated user creates an order through the API | `should create an order with a valid token` | `tests/APIProjectScenarios.spec.ts` |
| Authenticated user retrieves customer orders through the API | `should retrieve customer orders with a valid token` | `tests/APIProjectScenarios.spec.ts` |
| Order creation is rejected when authorization token is missing | `should reject order creation without authorization token` | `tests/APIProjectScenarios.spec.ts` |

## Execution Command

```bash
npx playwright test tests/APIProjectScenarios.spec.ts --project=chromium
```

## Current Execution Result

| Result | Count |
| --- | --- |
| Passed | 5 |
| Failed | 0 |

## Future BDD API Scenarios To Add

- Scenario: Order creation is rejected when product ordered ID is invalid.
- Scenario: Order creation is rejected when request body is malformed.
- Scenario: Order details are rejected when a user requests another customer's order.
- Scenario: API rejects requests with an invalid token.
- Scenario: API rejects requests with an expired token.

