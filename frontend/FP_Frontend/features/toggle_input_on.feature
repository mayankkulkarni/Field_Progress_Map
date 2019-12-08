Feature: Toggling Input Panel Off then back On
    Ensure that users who have toggled the Input Panel off can toggle it back on.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I click the "Toggle Input" button
        And I click the "Toggle Input" button
        Then the map should not cover the entire page
