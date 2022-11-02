Feature: As player, I want to train Soldiers for my town

  Scenario: If I own the town, the soldiers should be created
    Given I am sign in
    Given I joined a world
    Given I get my player information
    When I send a POST request to train-soldiers endpoint with my town and body:
    """
    {
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then The town request response status code should be 200
    And The town request response should be empty

  Scenario: If I dont own the town should return forbidden
    Given I am sign in
    Given I joined a world
    When I send a POST request to train-soldiers endpoint with not my town and body:
    """
    {
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 403
    And the response should be empty

  Scenario: If the town dont exist, should return not found
    Given I am sign in
    Given I joined a world
    When I send a POST request to "/towns/09e14836-d626-4bd1-978e-fae274719306/train-soldiers" with body:
    """
    {
      "soldiers": {
        "basic": 2
      }
    }
    """
    Then the response status code should be 404
    And the response should be empty

  Scenario: If the request is malformed, should return argument exception
    Given I am sign in
    Given I joined a world
    When I send a POST request to "/towns/09e14836-d626-4bd1-978e-fae274719306/train-soldiers" with body:
    """
    {}
    """
    Then the response status code should be 400
    And the response should be empty
