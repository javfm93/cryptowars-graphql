Feature: As user, I want to login to access the application
  Scenario: A valid existent user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "email": "newUser@email.com",
      "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 200
    Given I send a POST request to "/login" with body:
    """
    {
      "username": "newUser@email.com",
      "password": "P@ssw0rd"
    }
    """
    Then the response status code should be 200
    And the response should be empty

