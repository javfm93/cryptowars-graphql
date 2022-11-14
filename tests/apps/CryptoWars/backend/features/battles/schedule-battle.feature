@schedule-battle
Feature: As player, I want to attack other towns

  Scenario: If I own the town
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    When I send a PUT request to "battles/:uuid" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherTown",
      "troop": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 200
    And the response should be empty

  Scenario: If I dont own the town should return forbidden
    Given I am sign in
    Given I joined a world
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    When I create a battle of a town that i dont own
    Then The army response status code should be 403
    And The army response should be empty

  Scenario: If the town dont exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a PUT request to "battles/:uuid" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherTown",
      "troop": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: If the defender town dont exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a PUT request to "battles/:uuid" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":townId",
      "troop": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: If im not logged should return unauthorized
    When I send a PUT request to "battles/:uuid" with body:
    Then the response status code should be 401
    And the response should be empty

  Scenario: If the request is malformed should return bad request
    Given I am sign in
    Given I joined a world
    When I send a PUT request to "battles/:uuid" with body:
    """
    {
      "attackerArmy": ":armyId",
      "troop": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 400
    And the response should be empty

  Scenario: If the town does not have enough troops should return bad request
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    When I send a PUT request to "battles/:uuid" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherTown",
      "troop": {
        "basic": 3
      }
    }
    """
    Then the response status code should be 400
    And the response should be empty
