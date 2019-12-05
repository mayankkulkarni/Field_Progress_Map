Feature: Placeholder text should vanish as soon as a user begins typing
    Placeholder text exists for volunteer panels to provide suggested values. However, it should vanish as soon as users begin filling in values of their own.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        And I see a card with placeholder name "John Doe" and placeholder availability "3h"
        When I fill out volunteer "Stannis" with availability "12h"
        Then I should see a card for "Stannis" with availability "12h"