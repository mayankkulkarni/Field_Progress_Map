Feature: Toggling Input Panel Off
    Ensure that users can toggle off the input panel.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I click the "Toggle Input" button
        Then the map should cover the entire page
