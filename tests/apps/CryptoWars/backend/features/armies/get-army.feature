@battlefield
@get-army
Feature: As player, I want to know what is the army of my town

  @get-army-1
  Scenario: If I own the town
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    When I send a GET request to my town army
    Then The army response status code should be 200
    And The army response should contain:
    """
    {
      "squads": {
        "basic": 2
      }
    }
    """

  @get-army-2
  Scenario: If I dont own the town should return forbidden
    Given I am sign in
    Given I joined a world
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    When I send a GET request to the other user army
    Then The army response status code should be 403
    And The army response should be empty

  @get-army-3
  Scenario: If the town dont exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a GET request to "/army?townId=09e14836-d626-4bd1-978e-fae274719306"
    Then the response status code should be 404
    And the response should be empty

  Scenario: If im not logged should return unauthorized
    When I send a GET request to "/army?townId=09e14836-d626-4bd1-978e-fae274719306"
    Then the response status code should be 401
    And the response should be empty
