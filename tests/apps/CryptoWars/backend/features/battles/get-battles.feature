@battlefield-2
@get-battles
Feature: As player, I want check my attack results

  @get-battles-1
  Scenario: If I own the town
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    Given I get my army
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given Other player get his army
    Given I send an attack with 2 basic soldiers
    When I send a GET battles request with my army
    Then The battles response status code should be 200
    And The battles response content should be:
    """
    {
      "battles": [
        {
          "id": ":battleId",
          "attack": {
            "id": ":attackId",
            "attackerTroop": {
              "armyId": ":armyId",
              "squads": {
                "basic": 2
              }
            },
            "defenderArmyId": ":otherPlayerArmy",
            "sentAt": ":date"
          },
          "defenderArmy": {
            "id": ":otherPlayerArmy",
            "playerId": ":otherPlayerId",
            "squads": {
              "basic": 0,
              "range": 0
            },
            "townId": ":otherPlayerTown"
          },
          "finishedAt": ":date",
          "result": {
            "winner": "attacker",
            "attackerCasualties": {
              "basic": 0,
              "range": 0
            },
            "defenderCasualties": {
              "basic": 0,
              "range": 0
            },
            "returningTroop": {
              "armyId": ":armyId",
              "squads": {
                "basic": 2,
                "range": 0
              }
            }
          }
        }
      ]
    }
    """

  Scenario: If I dont own the army should return forbidden
    Given I am sign in
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given Other player get his army
    When I send a GET battles request to other army
    Then The battles response status code should be 403
    And The battles response should be empty

  Scenario: If the army does not exist, should return not found
    Given I am sign in
    When I send a GET request to "/battles?armyId=70557bda-cb6a-4789-9098-63a8b1881716"
    Then the response status code should be 404
    And the response should be empty

  Scenario: If im not logged should return unauthorized
    When I send a GET request to "/battles?armyId=70557bda-cb6a-4789-9098-63a8b1881716"
    Then the response status code should be 401
    And the response should be empty

  Scenario: If the request is malformed should return bad request
    Given I am sign in
    Given I joined a world
    When I send a GET request to "/battles?armyId=70557bda-cb6a-4789-9098-63a8b188171"
    Then the response status code should be 400
    And the response should be empty
