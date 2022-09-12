
Feature: As player, I want to have an user
  Scenario:
    Given I send an event to the event bus:
    """
    {
    	"data": {
    		"id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
    		"type": "cryptoWars.1.event.user.created",
    		"occurred_on": "2019-08-08T08:37:32+00:00",
    		"attributes": {
    			"id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a"
    		}
    	}
    }
    """

