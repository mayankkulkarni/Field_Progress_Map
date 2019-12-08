Feature: Warn user that one or more volunteer cards contain invalid names
    Should a user attempt to cut turf with volunteer cards that don't contain valid volunteer names, a message should be displayed to the user.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I fill out volunteer "Alex" with availability "22"
        And I add a new volunteer card
        And I fill out volunteer "" with availability "3"
        And I add a new volunteer card
        And I fill out volunteer "Jonathan" with availability "6"
        And I add a new volunteer card
        And I fill out volunteer "" with availability "0.5"
        Then I cut turf
        And I should be prompted to fill in valid names