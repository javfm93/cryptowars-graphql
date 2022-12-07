@communication
@get-messages
Feature: As player, I want to to get the messages of my chat

  @with-socket
  @get-messages-1
  Scenario: Get chat messages with other player
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given Other user is signed in
    Given Other user is in the same world
    Given Other user has his player information
    Given A chat was created
    Given I open a direct chat
    Given I send a message to the direct chat
    When I send a chats GET request to "/direct-chats/:chatId/messages"
    Then The chats response status code should be 200
    And The message response content should be:
    """
    {
      "messages": [
        {
          "id": ":messageId",
          "messageContent": ":messageContent",
          "senderPlayerId": ":playerId",
          "createdAt": ":sameDate",
          "order": -1,
          "chatId": ":chatId",
          "status": "sent"
        }
      ]
    }
    """

  @get-messages-2
  Scenario: If im not logged should return 401
    Given I send a GET request to "/direct-chats/ff2bdb73-8ddf-4c3f-b0c4-f90415eabe01/messages"
    Then the response status code should be 401
    And the response should be empty

#  @get-messages-3
#  Scenario: If the chat doesnt exist should return 404
#    Given I am sign in
#    Given I joined a world
#    Given I send a GET request to "/direct-chats/4b6630af-b783-4b75-8c5c-6e868c6178d0/messages"
#    Then the response status code should be 404
#    And the response should be empty
