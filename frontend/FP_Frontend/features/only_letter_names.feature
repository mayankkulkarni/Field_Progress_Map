Feature: Only allow letters in volunteer names
    We will only allow alphanumeric entry for volunteer names.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "John Doe" with availability "3"
        And I add a new volunteer card
        And I fill out volunteer "Robot-123" with availability "100"
        Then I should see a card for "John Doe" with availability "3"
        And I should see a card for "Robot" with availability "100"
