Feature: Adding a new volunteer when there are none
    Users who bring up the webapp for the first time should be able to add volunteers.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Jane" with availability "6h"
        Then I should see a card for "Jane" with availability "6h"