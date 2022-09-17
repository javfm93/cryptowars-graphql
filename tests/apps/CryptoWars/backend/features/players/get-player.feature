
Feature: As player, I want to see all my details
  Scenario:
    Given I am sign in
    Given I selected a world
    Given I send a GET request to "/player"
    Then the response status code should be 200
    And the response content should match the player response:
    """
       {
         "player": {
            "id": "b1d81290-d522-4382-a786-712f4b1aa2b9",
            "userId": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
            "worlds": [
              {
                "id": "93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b",
                "name": "Genesis World"
              }
            ],
            "towns": [
              {
                "id": "93bf78e8d3d64e5a9c0dff8e57ebc29b",
                "playerId": "Genesis World"
              }
            ]
          }
       }
    """

#    todo: missing set the playerid and return the list of towns
