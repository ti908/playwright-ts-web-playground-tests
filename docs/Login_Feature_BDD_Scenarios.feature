Feature: Login
  As a customer of the ecommerce platform
  I want to authenticate with my account credentials
  So that I can access the product dashboard and place orders

  Background:
    Given the user is on the ecommerce login page

  @login @positive @smoke
  Scenario: Registered user logs in successfully
    When the user logs in with a registered email and valid password
    Then the user should be redirected to the product dashboard
    And the product catalog should be visible

  @login @negative
  Scenario: Unregistered user cannot log in
    When the user logs in with an unregistered email and a valid-format password
    Then an authentication error alert should be displayed
    And the alert message should be "Incorrect email or password."
    And the user should remain on the login page

  @login @negative
  Scenario: Registered user enters an incorrect password
    When the user logs in with a registered email and an incorrect password
    Then an authentication error alert should be displayed
    And the user should remain on the login page

  @login @validation
  Scenario: User submits login form with blank email
    When the user submits the login form without entering an email
    Then an email validation message should be displayed
    And the login request should not be submitted

  @login @validation
  Scenario: User submits login form with blank password
    When the user enters a valid email
    And the user submits the login form without entering a password
    Then a password validation message should be displayed
    And the login request should not be submitted

  @login @validation
  Scenario: User submits login form with invalid email format
    When the user enters an invalid email format
    And the user enters a valid-format password
    And the user submits the login form
    Then an email format validation message should be displayed
    And the user should remain on the login page

  @login @accessibility
  Scenario: Login error is announced accessibly
    When the user logs in with invalid credentials
    Then the authentication error should be exposed as an alert
    And assistive technology should be able to read the error message

  @login @navigation
  Scenario: User navigates to password recovery
    When the user selects the forgot password link
    Then the user should be redirected to the password recovery page

  @login @navigation
  Scenario: User navigates to registration
    When the user selects the register link
    Then the user should be redirected to the registration page

