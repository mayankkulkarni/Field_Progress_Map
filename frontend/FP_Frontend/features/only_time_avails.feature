Feature: Only times are acceptable as availabilities
    Users should only be able to supply valid times as their availabilities.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Mary" with availability "3"
        And I add a new volunteer card
        And I fill out volunteer "Joseph" with availability "2!"
        And I add a new volunteer card
        And I fill out volunteer "Harod" with availability "-1"
        Then I should see a card for "Mary" with availability "3"
        And I should see a card for "Joseph" with availability "2"
        And I should see a card for "Harod" with availability "1"
