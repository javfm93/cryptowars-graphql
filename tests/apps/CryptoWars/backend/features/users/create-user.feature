@iam
Feature: As player, I want to create a new user

  Scenario: A valid not existent user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "email": "newUser@email.com",
      "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 200
    And the response should be empty
    When I log in with email "newUser@email.com" and password "P@ssw0rd"
    When I send a GET request to "/player"
    Then the response status code should be 200

  Scenario: A not valid user due to the email
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "email": "wrong email",
      "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 400
    And the response should be empty
