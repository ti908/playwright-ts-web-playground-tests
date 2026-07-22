Feature: Ecommerce Validations

    Feature Description

    Scenario: Placing the Order
    Given a Login to Ecommerce application with "martin.ampah@ashesi.edu.gh" and "French123"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory 