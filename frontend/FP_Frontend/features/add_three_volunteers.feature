Feature: Adding 3 new volunteer when there are none
    Users who bring up the webapp for the first time should be able to add 3 new volunteers.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Jane" with availability "6h"
        And I add a new volunteer card
        And I fill out volunteer "Jack" with availability "2h"
        And I add a new volunteer card
        And I fill out volunteer "Kate" with availability "4h"
        Then I should see a card for "Jane" with availability "6h"
        And I should see a card for "Jack" with availability "2h"
        And I should see a card for "Kate" with availability "4h"