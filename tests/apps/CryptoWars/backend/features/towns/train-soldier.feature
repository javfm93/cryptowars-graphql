Feature: As player, I want to train Soldiers for my town
  Scenario: If I own the town, the soldiers should be created
    Given I am sign in
    Given I selected a world
    When I send a POST request to "/towns/:townId/train-soldier" with body:
    """
    {
      "basic": 2
    }
    """
    Then the response status code should be 200
    And the response should be empty

  Scenario: If I dont own the town should return forbidden
    Given I am sign in
    Given I selected a world
    When I send a POST request to "/towns/:otherTownId/train-soldier" with body:
    """
    {
      "basic": 2
    }
    """
    Then the response status code should be 403
    And the response should be empty

  Scenario: If the town dont exist, should return notFound
    Given I am sign in
    Given I selected a world
    When I send a POST request to "/towns/09e14836-d626-4bd1-978e-fae274719306/train-soldier" with body:
    """
    {
      "basic": 2
    }
    """
    Then the response status code should be 404
    And the response should be empty
