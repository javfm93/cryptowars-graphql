Feature: As player, I want to select a world to start a game

  Scenario: In order to create a player in a world, a new town should be created and placed in the world
    Given I am sign in
    Given I send a PUT request to "/players/select-world" with body:
    """
    {
      "worldId": "93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b"
    }
    """
    Then the response status code should be 200
    And the response should be empty

  Scenario: If im not logged should return 401
    Given I send a PUT request to "/players/select-world" with body:
    """
    {
      "worldId": "93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b"
    }
    """
    Then the response status code should be 401
    And the response should be empty
