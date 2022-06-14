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


