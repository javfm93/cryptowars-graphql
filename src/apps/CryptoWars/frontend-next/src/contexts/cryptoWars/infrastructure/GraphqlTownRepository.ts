import { assertNeverHappen } from '@/contexts/shared/application/mutation'
import {
  CommandResult,
  Result,
  failure,
  success,
  successAndReturn
} from '@/contexts/shared/application/result'
import { ErrorFactory } from '@/contexts/shared/domain/Errors'
import { gql } from '@/contexts/shared/domain/__generated__'
import {
  PlayerTownHeadQuarterQuery,
  PlayerTownHeaderQuery,
  PlayerTownQuery,
  PlayerTownsQuery,
  TownSoldiers,
  TrainSoldiersErrors,
  UnexpectedError
} from '@/contexts/shared/domain/__generated__/graphql'
import { ApolloClient } from '@apollo/client'
import { Service } from 'diod'
import { TownRepository } from '../domain/TownRepository'

@Service()
export class GraphqlTownRepository implements TownRepository {
  constructor(readonly client: ApolloClient<any>) {}

  async getTown(id: string): Promise<Result<PlayerTownQuery['GetPlayerTown'], UnexpectedError>> {
    const data = await this.client.query({ query: playerTownQuery, variables: { id } })
    if (data.data) return successAndReturn(data.data.GetPlayerTown)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }

  async getTownHeader(
    id: string
  ): Promise<Result<PlayerTownHeaderQuery['GetPlayerTown'], UnexpectedError>> {
    const data = await this.client.query({ query: playerTownHeaderQuery, variables: { id } })
    if (data.data) return successAndReturn(data.data.GetPlayerTown)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }

  async getTowns(): Promise<Result<PlayerTownsQuery['GetPlayerTowns'], UnexpectedError>> {
    const data = await this.client.query({ query: playerTownsQuery })
    if (data.data) return successAndReturn(data.data.GetPlayerTowns)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }

  async trainSoldiers(
    townId: string,
    soldiers: TownSoldiers
  ): Promise<CommandResult<TrainSoldiersErrors>> {
    const request = await this.client.mutate({
      mutation: trainSoldiersMutation,
      variables: { input: { townId, soldiers } }
    })
    if (request.errors) {
      return failure(ErrorFactory.unexpected(request.errors[0].message))
    }

    const result = request.data?.TrainSoldiers
    if (request.data && result && result.__typename) {
      switch (result.__typename) {
        case 'SuccessCommand':
          return success()
        case 'NotFoundError':
          return failure(result)
        case 'ForbiddenError':
          return failure(result)
        case 'InvalidInputError':
          return failure(result)
        default:
          assertNeverHappen(result.__typename)
      }
    }
    return failure(ErrorFactory.unexpected())
  }

  async getPlayerTownHeadquarter(
    id: string
  ): Promise<Result<PlayerTownHeadQuarterQuery['GetPlayerTown'], UnexpectedError>> {
    const data = await this.client.query({ query: playerTownsHeadQuarterQuery, variables: { id } })
    if (data.data) return successAndReturn(data.data.GetPlayerTown)
    if (data.errors) {
      return failure(ErrorFactory.unexpected(data.errors[0].message))
    }
    return failure(ErrorFactory.unexpected())
  }
}

export const playerTownsQuery = gql(/* GraphQL */ `
  query PlayerTowns {
    GetPlayerTowns {
      towns {
        id
      }
    }
  }
`)

const playerTownQuery = gql(/* GraphQL */ `
  query PlayerTown($id: String!) {
    GetPlayerTown(id: $id) {
      id
      buildings {
        ...PlayerTownBuildings
      }
    }
  }
`)

const playerTownHeaderQuery = gql(/* GraphQL */ `
  query PlayerTownHeader($id: String!) {
    GetPlayerTown(id: $id) {
      id
      buildings {
        essenceGenerator {
          generationPerHour
        }
        warehouse {
          assets {
            essence {
              stored
              lastStorageUpdate
            }
          }
        }
      }
      worldId
    }
  }
`)

const playerTownsHeadQuarterQuery = gql(/* GraphQL */ `
  query PlayerTownHeadQuarter($id: String!) {
    GetPlayerTown(id: $id) {
      id
      buildings {
        headquarter {
          units {
            name
            speed
            capacity
            time
            cost
          }
        }
      }
    }
  }
`)

export const trainSoldiersMutation = gql(/* GraphQL */ `
  mutation TrainSoldiers($input: TrainSoldiersInput!) {
    TrainSoldiers(input: $input) {
      ... on SuccessCommand {
        isSuccess
      }
      ... on BaseError {
        error
        message
        status
      }
    }
  }
`)
