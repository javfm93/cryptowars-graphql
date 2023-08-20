This project is composed by 5 bounded contexts that are independently deployable, with their own databases, projections and the communication is done via async events.

**Battlefield**: The battle engine of the game, the persistance layer of this context is usen event sourcing to maximize the ingestion and be able to have the history of all the events that happened given a town.
**Communication**: This is a real time implementation using sockects of the chat between players.
**CryptoWars**: The main game, contains the logic of the game regrding towns and worlds.
**IAM**: Creation of new users.
**Scheduler**: Supporting domain that receives an event to be trigger in some ammount of time.

## Project Structure

```
src
|-- Apps: Entry points of the bounded context
|   |-- CryptoWars
|       |-- Backend: Server, Controllers, Routes and DI
|       |-- Fronted: Client Side React app
│
|-- Contexts: Diferent Bounded Context in the same repo
|   |-- CrytoWars
|       |-- Module: Usually, an aggregate, but also Shared
|           |-- Application: Use cases
|           |-- Domain: Aggregate root, Value objects, Interfaces
|           |-- Infrastructure: Outbound dependencies (external services, db...)
|
tests
|-- Apps
|   |-- CryptoWars
|       |-- Backend: Black box cucumber acceptance tests
|-- Contexts
|   |-- CrytoWars
|       |-- Module
|           |-- Application: Unit test
|           |-- Domain: Test the record of the proper event when an action is perform
|           |-- Infrastructure: Unit testing of external dependencies (integration test)
```

## Testing Strategy

C/Q = Command/Query

Data Flow Diagram

```
Controller --> C/Q Bus --> C/Q Handler --> Use Case --> Repositories
                                                    --> External Services

                           ------------------------     -----------------
                                   Unit Test             Integration Test
-------------------------------------------------------------------------
                              Acceptance Tests

```

Dependency Diagram

```
Controller <-- C/Q Bus -->\ C/Q Handler --> Use Case --> Repositories
                                                    --> External Services

```

## Deployment

Automatically deploys pushes to master to an aws micro using github actions,

TODO: containerization, infra as code, autoscalable ingra, securization

url: http://ec2-34-245-154-227.eu-west-1.compute.amazonaws.com/

todos:

- add name to the players
- add name to the villages
- allow training of range
- add time to the training
- add attacks to the schedule
- improve the battlefield engine
- add attack and defense to the units
- allow level up of buildings
- separate databases of context
- e2e tests should only apply one context
- create metrics based on events
- improve logs with context data
- create clans/guilds/kingdom/tribes with chat
