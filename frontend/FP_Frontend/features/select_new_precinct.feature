Feature: Selecting a new precinct number from the dropdown
    Users should be able to select new precincts to cut by choosign from the dropdown menu.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I select "110610" from the precinct dropdown
        Then I should see "110610" selected in the precinct dropdown