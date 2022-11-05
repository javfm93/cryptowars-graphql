Feature: As player, I want to train Soldiers for my town

  Scenario: If I own the town
    Given I am sign in
    Given I joined a world
    Given I get my player information
    Given I have 2 basic soldiers in my army
    When I send a GET request to my town army
    Then The army response status code should be 200
    And The army response should contain:
    """
    {
      "soldiers": {
        "basic": 2
      }
    }
    """
    
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

