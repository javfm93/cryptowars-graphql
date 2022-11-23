Feature: As player, I want to know what are the worlds available to play

  Scenario:
    Given I am sign in
    Given I send a GET request to "/worlds"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "worlds": [{
        "id": "93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b",
        "name": "Genesis World",
        "players": [],
        "towns": []
      }]
    }
    """
