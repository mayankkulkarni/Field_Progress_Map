Feature: Sliding the scatterplot radius slider to the left
    Users who wish to decrease the radius of the scatterplot should be able to by sliding the radius slider to the left.

    Scenario:
        Given I am on the Field Progress Webapp webpage
        When I slide the scatterplot slider to the "left" by 15
        Then the scatterplot radius should be "2.5"