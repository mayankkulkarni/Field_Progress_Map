Feature: Adding a new volunteer and toggling the input panel
    Users should be able to add an arbitrary number of volunteers to the website and toggle the input panel as much as they like without affecting the functionality.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Ronald" with availability "3h"
        And I add a new volunteer card
        And I fill out volunteer "Jerry" with availability "2h"
        And I click the "Toggle Input" button
        And I click the "Toggle Input" button
        And I click the "Toggle Input" button
        And I click the "Toggle Input" button
        Then I should see a card for "Jerry" with availability "2h"
        And I should see a card for "Ronald" with availability "3h"
