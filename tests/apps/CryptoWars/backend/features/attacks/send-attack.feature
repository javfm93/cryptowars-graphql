@send-attack
Feature: As player, I want to attack other towns

  @send-attack-1
  Scenario: If I own the town
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    Given I get my army
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    When I send a PUT attack request to "/attacks/8d9699ee-9013-47cb-bed7-10341e6927b8" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherPlayerTown",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 200
    And The attack response should be empty

  @send-attack-2
  Scenario: If I dont own the town should return forbidden
    Given I am sign in
    Given I joined a world
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given Other player get his army
    When I send a PUT attack request to "/attacks/0de31d32-7656-456f-8ad5-e2a6057dff8f" with body:
    """
    {
      "attackerArmy": ":otherPlayerArmy",
      "defenderTown": ":otherPlayerTown",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 403
    And The attack response should be empty

  Scenario: If the army does not exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a PUT attack request to "/attacks/0de31d32-7656-456f-8ad5-e2a6057dff8f" with body:
    """
    {
      "attackerArmy": "88447f39-2f3a-40b9-944a-5f1ef0d163df",
      "defenderTown": ":otherPlayerTown",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 404
    And The attack response should be empty

  Scenario: If the defender town does not exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a PUT attack request to "/attacks/b4d34fb7-c0c4-4292-af09-ebad6957bfc6" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": "a80c821a-1962-4bd0-8c47-1933d0bb6dc6",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 404
    And The attack response should be empty

  Scenario: If im not logged should return unauthorized
    When I send a PUT attack request to "/attacks/b4d34fb7-c0c4-4292-af09-ebad6957bfc6" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherPlayerTown",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 401
    And The attack response should be empty

  Scenario: If the request is malformed should return bad request
    Given I am sign in
    Given I joined a world
    When I send a PUT attack request to "/attacks/b4d34fb7-c0c4-4292-af09-ebad6957bfc6" with body:
    """
    {
      "attackerArmy": ":armyId",
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The attack response status code should be 400
    And The attack response should be empty

  Scenario: If the town does not have enough soldiers should return bad request
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    Given I get my army
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    When I send a PUT attack request to "/attacks/8d9699ee-9013-47cb-bed7-10341e6927b8" with body:
    """
    {
      "attackerArmy": ":armyId",
      "defenderTown": ":otherPlayerTown",
      "soldiers": {
        "basic": 3
      }
    }
    """
    Then The attack response status code should be 400
    And The attack response should be empty
