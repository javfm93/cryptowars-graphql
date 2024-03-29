@cryptoWars
@get-player
Feature: As player, I want to see all my details

  Scenario: A player checks his own details
    Given I am sign in
    Given I joined a world
    When I send a GET request to "/player"
    Then the response status code should be 200
    And The response content should match the player response:
    """
       {
         "player": {
            "id": "b1d81290-d522-4382-a786-712f4b1aa2b9",
            "userId": ":userId",
            "worlds": [
              {
                "id": ":worldId",
                "name": "Genesis World",
                "players": [],
                "towns": []
              }
            ],
            "towns": [
              {
                "id": ":townId",
                "playerId": ":playerId",
                "buildings": {
                  "headquarter": {
                    "level": 0,
                    "essenceRequiredToLevelUp": 10,
                    "type": "creator",
                    "units": [
                      {
                        "capacity": 5,
                        "cost": 1,
                        "name": "basic",
                        "speed": 10,
                        "time": 1
                      },
                      {
                        "capacity": 20,
                        "cost": 1,
                        "name": "range",
                        "speed": 5,
                        "time": 10
                      }
                    ]
                  },
                  "essenceGenerator": {
                    "level": 1,
                    "essenceRequiredToLevelUp": 30,
                    "type": "generator",
                    "asset": "essence",
                    "generationPerHour": 60
                  },
                  "warehouse": {
                    "level": 1,
                    "essenceRequiredToLevelUp": 30,
                    "type": "store",
                    "assets": {
                      "essence": {
                        "name": "essence",
                        "limit": 1000,
                        "stored": 10,
                        "lastStorageUpdate": ":isoTimeNow"
                      }
                    }
                  }
                }
              }
            ]
          }
       }
    """

