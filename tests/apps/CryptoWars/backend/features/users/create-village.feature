Feature: Create a new village
  In order to have villages in the game
  As a new user
  I want to create my first village

  Scenario: A valid not existent user
    Given I send a PUT request to "/villages/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {}
    """
    Then the response status code should be 200
    And the response should be empty
