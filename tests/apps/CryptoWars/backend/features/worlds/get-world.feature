@cryptoWars
Feature: As player, I want to know all the towns in a world

  @get-world
  Scenario: The world comes with the list of towns and players on it
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given I send a GET world request to "/worlds/93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b"
    Then The world response status code should be 200
    And The world response content should be:
    """
    {
      "world": {
        "id": "93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b",
        "name": "Genesis World",
        "towns": [
          {
            "id": ":townId",
            "playerId": ":playerId"
          },
          {
            "id": ":otherPlayerTownId",
            "playerId": ":otherPlayerId"
          }
        ]
      }
    }
    """
