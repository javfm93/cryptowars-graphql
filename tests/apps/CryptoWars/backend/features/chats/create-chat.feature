@communication
@create-chat
Feature: As player, I want to create a new direct chat with other player

  @create-chat-1
  Scenario: If im not logged should return 401
    Given I send a PUT request to "/direct-chats/4b6630af-b783-4b75-8c5c-6e868c6178d0":
    Then the response status code should be 401
    And the response should be empty

#  @create-chat-2
#  Scenario: If the other player dont exist should return 404
#    Given I am sign in
#    Given I joined a world
#    Given I send a PUT request to "/direct-chats/4b6630af-b783-4b75-8c5c-6e868c6178d0" with body:
#    """
#    {
#      "playerTwoId": "956b7d42-62d5-445f-8b87-1fd4f66b515a"
#    }
#    """
#    Then the response status code should be 404
#    And the response should be empty
