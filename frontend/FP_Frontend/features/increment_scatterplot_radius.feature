Feature: Sliding the scatterplot radius slider to the right
    Users who wish to increase the radius of the scatterplot should be able to by sliding the radius slider to the right.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I slide the scatterplot slider to the "right" by 5
        Then the scatterplot radius should be "4.5"