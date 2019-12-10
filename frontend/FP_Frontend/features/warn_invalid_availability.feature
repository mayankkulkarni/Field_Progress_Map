Feature: Warn user that one or more volunteer cards contain invalid availabilities
    Should a user attempt to cut turf with volunteer cards that don't contain valid volunteer availabilities, a message should be displayed to the user.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Alex" with availability ""
        And I add a new volunteer card
        And I fill out volunteer "Roger" with availability "3"
        And I add a new volunteer card
        And I fill out volunteer "Jonathan" with availability ""
        And I add a new volunteer card
        And I fill out volunteer "Mary" with availability ""
        Then I cut turf
        And I should be prompted to fill in valid availabilities