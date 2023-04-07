import { Result, failure, successAndReturn } from '@/contexts/shared/application/result'
import { ErrorFactory } from '@/contexts/shared/domain/Errors'
import { gql } from '@/contexts/shared/domain/__generated__'
import { ApolloClient } from '@apollo/client'
import { Service } from 'diod'
import {
  PlayerTownHeaderQuery,
  PlayerTownQuery,
  PlayerTownsQuery,
  UnexpectedError
} from '../../../../../../../../tests/apps/CryptoWars/backend/__generated__/graphql'
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
