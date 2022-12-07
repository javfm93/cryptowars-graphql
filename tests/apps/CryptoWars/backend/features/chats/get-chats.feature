@communication
@get-chats
Feature: As player, I want to know all the towns in a world

  @get-chats-1
  Scenario: Get the chats of a player
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given A chat was created
    When I send a chats GET request to "/direct-chats"
    Then The chats response status code should be 200
    And The chats response content should be:
    """
    {
      "chats": [
        {
          "id": ":chatId",
          "playerOneId": ":playerId",
          "playerTwoId": ":otherPlayerId",
          "createdAt": ":sameDate",
          "type": "direct"
        }
      ]
    }
    """

  @get-chats-2
  Scenario: If the user is not logging should return unauthorized
    When I send a GET request to "/direct-chats"
    Then the response status code should be 401
    And the response should be empty

